import { config } from 'dotenv';
config();

import '@/ai/flows/generate-highlight-clip.ts';
import '@/ai/flows/transcribe-content-from-source.ts';
import '@/ai/flows/detect-content-language.ts';
import '@/ai/flows/adjust-summary-type.ts';
import '@/ai/flows/generate-structured-summary.ts';