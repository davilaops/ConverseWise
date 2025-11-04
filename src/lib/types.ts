export type Summary = {
  id: string;
  title: string;
  sourceType: 'YouTube' | 'Zoom' | 'Google Meet' | 'Telegram' | 'File Upload';
  date: string;
  quickSummary: string;
  duration: number; // in seconds
};

export type StructuredSummary = {
  keyPoints: string[];
  decisions: string[];
  speakerIdentification: string[];
  insights: string[];
  nextSteps: string[];
};
