import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Film, Languages, Share2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/logo';

const features = [
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: 'Transcrição com IA',
    description: 'Transcreva com precisão áudio e vídeo de qualquer fonte em texto.',
  },
  {
    icon: <Film className="h-8 w-8 text-primary" />,
    title: 'Resumos Inteligentes',
    description: 'Obtenha resumos estruturados com pontos-chave, decisões e próximos passos.',
  },
  {
    icon: <Languages className="h-8 w-8 text-primary" />,
    title: 'Suporte Multilíngue',
    description: 'Detecção automática de idioma para transcrição perfeita em inglês e português.',
  },
  {
    icon: <Share2 className="h-8 w-8 text-primary" />,
    title: 'Exporte e Compartilhe',
    description: 'Exporte facilmente seus resumos para PDF, DOCX e compartilhe por vários canais.',
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Entrar</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Comece Grátis</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="text-center py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 font-headline">
              Desbloqueie Insights de Suas Conversas
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
              O ConversaWise usa IA para transcrever, resumir e analisar seu conteúdo de áudio e vídeo, transformando longas reuniões e chamadas em inteligência acionável.
            </p>
            <Button size="lg" asChild>
              <Link href="/signup">Inicie seu Teste Gratuito</Link>
            </Button>
          </div>
        </section>

        <section id="features" className="py-20 lg:py-24 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Recursos Poderosos, Entregues com Simplicidade</h2>
              <p className="max-w-xl mx-auto text-muted-foreground mt-2">
                Tudo o que você precisa para ser mais produtivo.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto bg-accent rounded-full p-3 w-fit">
                      {feature.icon}
                    </div>
                    <CardTitle className="mt-4 font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Pronto para Aumentar sua Produtividade?</h2>
              <p className="max-w-xl mx-auto text-muted-foreground mt-2 mb-8">
                Junte-se a milhares de usuários que confiam no ConversaWise para extrair sentido de seu conteúdo de áudio e vídeo.
              </p>
              <Button size="lg" asChild>
                <Link href="/signup">Cadastre-se Agora</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ConversaWise. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
