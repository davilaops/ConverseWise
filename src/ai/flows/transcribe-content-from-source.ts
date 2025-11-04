'use server';
/**
 * @fileOverview Transcribes content from various sources (YouTube, Zoom, Meet, Telegram, uploaded files) into text.
 *
 * - transcribeContent - A function that handles the transcription process.
 * - TranscribeContentInput - The input type for the transcribeContent function.
 * - TranscribeContentOutput - The return type for the transcribeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TranscribeContentInputSchema = z.object({
  sourceUrl: z.string().optional().describe('URL of the content to transcribe (e.g., YouTube).'),
  audioDataUri: z
    .string()
    .optional()
    .describe(
      "Audio file data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'"
    ),
  language: z.string().optional().describe('The language of the content. If not provided, will attempt to auto-detect.'),
});
export type TranscribeContentInput = z.infer<typeof TranscribeContentInputSchema>;

const TranscribeContentOutputSchema = z.object({
  transcription: z.string().describe('The transcribed text content.'),
  language: z.string().optional().describe('The detected language of the content.'),
});
export type TranscribeContentOutput = z.infer<typeof TranscribeContentOutputSchema>;

export async function transcribeContent(input: TranscribeContentInput): Promise<TranscribeContentOutput> {
  return transcribeContentFlow(input);
}

const transcribeContentPrompt = ai.definePrompt({
  name: 'transcribeContentPrompt',
  input: {schema: TranscribeContentInputSchema},
  output: {schema: TranscribeContentOutputSchema},
  prompt: `You are an expert transcriptionist. Please transcribe the following content.

  {% if language %}The language of the content is {{language}}.{% endif %}

  {% if sourceUrl %}Source URL: {{sourceUrl}}{% endif %}
  {% if audioDataUri %}Audio Content: {{media url=audioDataUri}}{% endif %}
  Transcription:`,
});

const transcribeContentFlow = ai.defineFlow(
  {
    name: 'transcribeContentFlow',
    inputSchema: TranscribeContentInputSchema,
    outputSchema: TranscribeContentOutputSchema,
  },
  async input => {
    const {output} = await transcribeContentPrompt(input);
    return output!;
  }
);
