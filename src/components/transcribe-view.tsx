'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  FileUp,
  Link as LinkIcon,
  Loader2,
  Share2,
  FileText,
  Download,
  Copy,
  Scissors,
  Sparkles,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateStructuredSummary } from '@/ai/flows/generate-structured-summary';
import { transcribeContent } from '@/ai/flows/transcribe-content-from-source';
import type { StructuredSummary } from '@/lib/types';
import { adjustSummaryType } from '@/ai/flows/adjust-summary-type';
import { generateHighlightClip } from '@/ai/flows/generate-highlight-clip';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

// Mock data to simulate API responses for read-only mode
const mockTranscription = `Bem-vindos todos à reunião de estratégia de marketing do segundo trimestre. Hoje, vamos finalizar nossos planos para o próximo trimestre. Vamos começar com uma revisão dos resultados do primeiro trimestre. Sarah, pode começar?
Obrigada, Tom. O primeiro trimestre foi um grande sucesso. Vimos um aumento de 20% na geração de leads, em grande parte graças à nova estratégia de conteúdo do blog. Nosso engajamento no LinkedIn também cresceu 15%. No entanto, nossa presença no Instagram está estagnada.
Ótimas notícias sobre a geração de leads, Sarah. Para o segundo trimestre, proponho dobrarmos o que está funcionando. Mais orçamento para criação de conteúdo. Mas precisamos resolver a questão do Instagram. Acho que deveríamos lançar uma campanha de anúncios direcionada.
Eu concordo. Devemos focar nossos esforços em conteúdo de vídeo no Instagram, especificamente Reels. Os dados sugerem que é aí que está o crescimento.
Ok, decisão tomada. Vamos alocar R$10.000 adicionais ao orçamento de conteúdo e focar nossos esforços sociais em Reels do Instagram para o segundo trimestre. Mark, você liderará a campanha de anúncios. Sarah, você supervisionará a criação de conteúdo. Os próximos passos são para Mark apresentar uma proposta de campanha até a próxima sexta-feira. Reunião encerrada.`;

const mockSummary: StructuredSummary = {
  keyPoints: [
    'O 1º trimestre mostrou um aumento de 20% na geração de leads devido à estratégia de conteúdo.',
    'O engajamento no Instagram esteve estagnado no 1º trimestre.',
    'Foi feita uma proposta para aumentar o orçamento de criação de conteúdo.',
    'A equipe decidiu focar nos Reels do Instagram para o 2º trimestre.',
  ],
  decisions: [
    'R$10.000 adicionais serão alocados ao orçamento de conteúdo para o 2º trimestre.',
    'Os esforços de mídia social serão concentrados nos Reels do Instagram.',
  ],
  speakerIdentification: [
    'Tom: Líder da reunião, solicitou a revisão.',
    'Sarah: Apresentou os resultados do 1º trimestre, destacou sucessos e fraquezas.',
    'Mark (implícito): Designado para liderar a nova campanha de anúncios do Instagram.',
  ],
  insights: [
    'O marketing de conteúdo é um forte impulsionador da geração de leads para a empresa.',
    'O conteúdo de vídeo no Instagram é uma área chave para o crescimento.',
  ],
  nextSteps: ['Mark deve apresentar uma proposta para a campanha de anúncios do Instagram até a próxima sexta-feira.'],
};

export function TranscribeView({ isReadOnly = false }: { isReadOnly?: boolean }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [sourceUrl, setSourceUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [transcription, setTranscription] = useState(isReadOnly ? mockTranscription : '');
  const [summary, setSummary] = useState<StructuredSummary | null>(isReadOnly ? mockSummary : null);
  const [adjustedSummary, setAdjustedSummary] = useState('');

  const [selectedText, setSelectedText] = useState('');
  const [popoverOpen, setPopoverOpen] = useState(false);
  const transcriptionRef = useRef<HTMLDivElement>(null);

  const handleTextSelection = () => {
    const text = window.getSelection()?.toString() || '';
    if (text.trim().length > 10) {
        setSelectedText(text);
        setPopoverOpen(true);
    } else {
        setPopoverOpen(false);
    }
  };
  
  useEffect(() => {
    const ref = transcriptionRef.current;
    if (ref) {
      const handleMouseUp = () => handleTextSelection();
      ref.addEventListener('mouseup', handleMouseUp);
      return () => {
        ref.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [transcription]);


  const handleSubmit = () => {
    if (!sourceUrl && !fileName) {
      toast({ title: 'Erro', description: 'Por favor, forneça uma URL ou envie um arquivo.', variant: 'destructive' });
      return;
    }

    startTransition(async () => {
      try {
        const transcriptionResult = await transcribeContent({ sourceUrl });
        setTranscription(transcriptionResult.transcription);

        toast({ title: 'Sucesso', description: 'Transcrição completa. Gerando resumo...' });

        const summaryResult = await generateStructuredSummary({ transcription: transcriptionResult.transcription });
        setSummary(summaryResult.summary);
        toast({ title: 'Sucesso', description: 'Resumo gerado com sucesso.' });
      } catch (error) {
        console.error(error);
        toast({ title: 'Erro', description: 'Ocorreu um erro durante o processo.', variant: 'destructive' });
      }
    });
  };

  const handleAdjustSummary = (summaryType: 'quick' | 'complete' | 'executive') => {
    startTransition(async () => {
      try {
        const result = await adjustSummaryType({ transcribedText: transcription, summaryType });
        setAdjustedSummary(result.summary);
      } catch (error) {
        toast({ title: 'Erro', description: 'Falha ao ajustar o resumo.', variant: 'destructive' });
      }
    });
  };

  const handleCreateHighlight = (outputType: 'text' | 'video') => {
    setPopoverOpen(false);
    startTransition(async () => {
        try {
            const result = await generateHighlightClip({ transcribedText: transcription, selectedText, outputType });
            // For now, we'll just toast the result
            toast({ 
                title: `Destaque de ${outputType === 'text' ? 'Texto' : 'Vídeo'} Criado`,
                description: <p className="font-code text-xs">{result.highlight}</p>,
                duration: 9000,
            });
        } catch (error) {
            toast({ title: 'Erro', description: 'Falha ao criar destaque.', variant: 'destructive' });
        }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {!isReadOnly && (
        <Card className="lg:col-span-1 sticky top-20">
          <CardHeader>
            <CardTitle>Fonte do Conteúdo</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="link">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="link">
                  <LinkIcon className="mr-2 h-4 w-4" /> Link
                </TabsTrigger>
                <TabsTrigger value="upload">
                  <FileUp className="mr-2 h-4 w-4" /> Upload
                </TabsTrigger>
              </TabsList>
              <TabsContent value="link" className="mt-4">
                <div className="space-y-2">
                  <Label htmlFor="url">URL da Fonte</Label>
                  <Input
                    id="url"
                    placeholder="https://youtube.com/watch?v=..."
                    value={sourceUrl}
                    onChange={(e) => setSourceUrl(e.target.value)}
                  />
                </div>
              </TabsContent>
              <TabsContent value="upload" className="mt-4">
                <div className="space-y-2">
                  <Label htmlFor="file-upload">Arquivo de Áudio ou Vídeo</Label>
                  <Input id="file-upload" type="file" onChange={(e) => setFileName(e.target.files?.[0].name || '')} />
                  {fileName && <p className="text-sm text-muted-foreground">Selecionado: {fileName}</p>}
                </div>
              </TabsContent>
            </Tabs>
            <Button onClick={handleSubmit} disabled={isPending} className="w-full mt-6">
              {isPending ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processando...</>
              ) : (
                'Transcrever e Resumir'
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      <div className={isReadOnly ? "lg:col-span-3" : "lg:col-span-2"}>
        {isPending && !transcription && (
          <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed rounded-lg">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-lg font-semibold">Processando seu conteúdo...</p>
            <p className="text-muted-foreground">Isso pode levar alguns instantes.</p>
          </div>
        )}

        {(transcription || summary) && (
          <Tabs defaultValue="summary">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="summary">Resumo</TabsTrigger>
                <TabsTrigger value="transcription">Transcrição</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm"><Download className="mr-2" /> DOCX</Button>
                <Button variant="outline" size="sm"><FileText className="mr-2" /> PDF</Button>
                <Button variant="outline" size="sm"><Share2 className="mr-2" /> Compartilhar</Button>
              </div>
            </div>

            <TabsContent value="summary">
              <Card>
                <CardHeader>
                  <CardTitle>Resumo Gerado por IA</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="structured" className="w-full">
                    <TabsList>
                      <TabsTrigger value="structured">Estruturado</TabsTrigger>
                      <TabsTrigger value="quick" onClick={() => handleAdjustSummary('quick')}>Rápido</TabsTrigger>
                      <TabsTrigger value="complete" onClick={() => handleAdjustSummary('complete')}>Completo</TabsTrigger>
                      <TabsTrigger value="executive" onClick={() => handleAdjustSummary('executive')}>Executivo</TabsTrigger>
                    </TabsList>
                    <TabsContent value="structured" className="mt-4">
                      {summary ? (
                        <div className="space-y-4">
                          {Object.entries(summary).map(([key, value]) => (
                            <div key={key}>
                              <h3 className="font-semibold text-lg mb-2 capitalize font-headline">
                                {
                                  {
                                    keyPoints: 'Pontos-Chave',
                                    decisions: 'Decisões',
                                    speakerIdentification: 'Identificação dos Oradores',
                                    insights: 'Insights',
                                    nextSteps: 'Próximos Passos'
                                  }[key] || key.replace(/([A-Z])/g, ' $1').trim()
                                }
                              </h3>
                              <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                                {Array.isArray(value) && value.map((item, i) => <li key={i}>{item}</li>)}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : <p>Carregando resumo...</p>}
                    </TabsContent>
                     <TabsContent value="quick" className="mt-4">
                       <p className="text-muted-foreground whitespace-pre-wrap">{adjustedSummary || "Clique na aba para gerar..."}</p>
                     </TabsContent>
                     <TabsContent value="complete" className="mt-4">
                       <p className="text-muted-foreground whitespace-pre-wrap">{adjustedSummary || "Clique na aba para gerar..."}</p>
                     </TabsContent>
                     <TabsContent value="executive" className="mt-4">
                       <p className="text-muted-foreground whitespace-pre-wrap">{adjustedSummary || "Clique na aba para gerar..."}</p>
                     </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transcription">
              <Card>
                <CardHeader>
                    <div className='flex justify-between items-center'>
                      <CardTitle>Transcrição Completa</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => {
                        navigator.clipboard.writeText(transcription);
                        toast({title: "Copiado para a área de transferência!"})
                      }}><Copy className="mr-2" /> Copiar</Button>
                    </div>
                </CardHeader>
                <CardContent>
                  <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                      <PopoverTrigger asChild>
                          <div ref={transcriptionRef} className="text-muted-foreground whitespace-pre-wrap leading-relaxed max-h-[60vh] overflow-y-auto p-2 rounded-md bg-secondary/50 selection:bg-primary/30" onMouseUp={handleTextSelection}>
                              {transcription || 'A transcrição aparecerá aqui.'}
                          </div>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-1'>
                        <div className='flex items-center gap-1'>
                            <Button variant="ghost" size="sm" onClick={() => handleCreateHighlight('text')}>
                                <Sparkles className='mr-2 h-4 w-4'/> Destaque de Texto
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleCreateHighlight('video')}>
                                <Scissors className='mr-2 h-4 w-4'/> Clipe de Vídeo
                            </Button>
                        </div>
                      </PopoverContent>
                  </Popover>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
