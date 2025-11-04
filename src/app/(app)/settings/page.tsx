import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Pro Mensal',
    price: 'R$40/mês',
    features: ['Transcrições ilimitadas', 'Resumos de IA', 'Opções de exportação', 'Suporte prioritário'],
  },
  {
    name: 'Pro Anual',
    price: 'R$400/ano',
    features: ['Todos os recursos Pro', '2 meses grátis', 'Ciclo de faturamento anual'],
    highlight: true,
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Configurações</h1>
        <p className="text-muted-foreground">Gerencie sua conta e preferências de assinatura.</p>
      </div>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="subscription">Assinatura</TabsTrigger>
          <TabsTrigger value="billing">Faturamento</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Seu Perfil</CardTitle>
              <CardDescription>Atualize suas informações pessoais.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" defaultValue="João da Silva" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Endereço de Email</Label>
                <Input id="email" type="email" defaultValue="joao.silva@exemplo.com" disabled />
              </div>
              <Button>Salvar Alterações</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Assinatura</CardTitle>
              <CardDescription>Você está atualmente no plano de Teste Gratuito. Atualize para desbloquear mais recursos.</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="pro-mensal" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plans.map(plan => (
                  <Label key={plan.name} htmlFor={plan.name} className={`relative flex flex-col p-4 border rounded-lg cursor-pointer ${plan.highlight ? 'border-primary' : ''}`}>
                    {plan.highlight && (
                      <div className="absolute top-2 right-2 flex items-center gap-1 text-sm text-primary font-semibold">
                        <Zap className="w-4 h-4" /> Melhor Valor
                      </div>
                    )}
                    <RadioGroupItem value={plan.name.toLowerCase().replace(' ', '-')} id={plan.name} className="absolute top-4 left-4" />
                    <div className="pl-8">
                      <span className="font-semibold text-lg">{plan.name}</span>
                      <p className="text-2xl font-bold">{plan.price}</p>
                      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                        {plan.features.map(feature => (
                          <li key={feature} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Label>
                ))}
              </RadioGroup>
              <Button className="mt-6 w-full" size="lg">Atualizar para Pro</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Faturamento</CardTitle>
              <CardDescription>Revise suas faturas passadas.</CardDescription>
            </CardHeader>
            <CardContent className="text-center text-muted-foreground py-12">
              <p>Nenhuma fatura encontrada.</p>
              <p className="text-sm">Seu histórico de faturamento aparecerá aqui assim que você assinar um plano.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
