import type { Summary } from './types';

export const mockSummaries: Summary[] = [
  {
    id: '1',
    title: 'Reunião de Estratégia de Marketing Q2',
    sourceType: 'Zoom',
    date: '2024-05-10T14:30:00Z',
    quickSummary: 'Discutimos as campanhas de marketing do Q2, alocação de orçamento e estratégia de mídia social. Decisões importantes sobre o foco no Instagram.',
    duration: 3600, // 1 hora
  },
  {
    id: '2',
    title: 'Design Sprint - Dia 3',
    sourceType: 'Google Meet',
    date: '2024-05-09T09:00:00Z',
    quickSummary: 'Finalizamos o fluxo de usuário para o novo processo de checkout. Próximos passos de prototipagem atribuídos à equipe de design.',
    duration: 5400, // 1.5 horas
  },
  {
    id: '3',
    title: 'Podcast do Lex Fridman #300',
    sourceType: 'YouTube',
    date: '2024-05-08T18:00:00Z',
    quickSummary: 'Conversa aprofundada sobre o futuro da inteligência artificial, ética e seu impacto na sociedade.',
    duration: 9860, // ~2.7 horas
  },
  {
    id: '4',
    title: 'Chamada de Onboarding - Acme Corp',
    sourceType: 'File Upload',
    date: '2024-05-07T11:00:00Z',
    quickSummary: 'Apresentação da nossa plataforma para a equipe da Acme Corp, respondemos a perguntas iniciais e definimos marcos do projeto.',
    duration: 2700, // 45 minutos
  },
  {
    id: '5',
    title: 'Sincronização Semanal da Equipe',
    sourceType: 'Zoom',
    date: '2024-05-06T10:00:00Z',
    quickSummary: 'Atualizações das equipes de engenharia, produto e vendas. Bloqueios identificados para o próximo lançamento.',
    duration: 1800, // 30 minutos
  },
  {
    id: '6',
    title: 'Preparação Lançamento Product Hunt',
    sourceType: 'Telegram',
    date: '2024-05-05T16:00:00Z',
    quickSummary: 'Reunião de coordenação para o próximo lançamento no Product Hunt. Finalizamos os ativos e a mensagem de lançamento.',
    duration: 2100, // 35 minutos
  },
];
