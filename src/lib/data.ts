import type { Summary } from './types';

export const mockSummaries: Summary[] = [
  {
    id: '1',
    title: 'Q2 Marketing Strategy Meeting',
    sourceType: 'Zoom',
    date: '2024-05-10T14:30:00Z',
    quickSummary: 'Discussed Q2 marketing campaigns, budget allocation, and social media strategy. Key decisions on Instagram focus.',
    duration: 3600, // 1 hour
  },
  {
    id: '2',
    title: 'Design Sprint - Day 3',
    sourceType: 'Google Meet',
    date: '2024-05-09T09:00:00Z',
    quickSummary: 'Finalized user flow for the new checkout process. Prototyping next steps assigned to the design team.',
    duration: 5400, // 1.5 hours
  },
  {
    id: '3',
    title: 'Lex Fridman Podcast #300',
    sourceType: 'YouTube',
    date: '2024-05-08T18:00:00Z',
    quickSummary: 'In-depth conversation about the future of artificial intelligence, ethics, and its impact on society.',
    duration: 9860, // ~2.7 hours
  },
  {
    id: '4',
    title: 'Client Onboarding Call - Acme Corp',
    sourceType: 'File Upload',
    date: '2024-05-07T11:00:00Z',
    quickSummary: 'Walkthrough of our platform with the Acme Corp team, answered initial questions, and set up project milestones.',
    duration: 2700, // 45 minutes
  },
  {
    id: '5',
    title: 'Weekly Team Sync',
    sourceType: 'Zoom',
    date: '2024-05-06T10:00:00Z',
    quickSummary: 'Updates from engineering, product, and sales teams. Blockers identified for the upcoming release.',
    duration: 1800, // 30 minutes
  },
  {
    id: '6',
    title: 'Product Hunt Launch Prep',
    sourceType: 'Telegram',
    date: '2024-05-05T16:00:00Z',
    quickSummary: 'Coordination meeting for the upcoming Product Hunt launch. Finalized launch assets and messaging.',
    duration: 2100, // 35 minutes
  },
];
