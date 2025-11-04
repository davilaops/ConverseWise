'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating structured summaries of transcribed content.
 *
 * The flow takes transcribed text as input and returns a structured summary containing key points,
 * decisions, speaker identification, insights, and next steps.
 *
 * @interface GenerateStructuredSummaryInput - The input schema for the generateStructuredSummary function.
 * @interface GenerateStructuredSummaryOutput - The output schema for the generateStructuredSummary function.
 * @function generateStructuredSummary - The main function to trigger the structured summary generation flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStructuredSummaryInputSchema = z.object({
  transcription: z
    .string()
    .describe('The transcribed text content to be summarized.'),
});
export type GenerateStructuredSummaryInput = z.infer<
  typeof GenerateStructuredSummaryInputSchema
>;

const GenerateStructuredSummaryOutputSchema = z.object({
  summary: z.object({
    keyPoints: z.array(z.string()).describe('The most important points.'),
    decisions: z.array(z.string()).describe('Key decisions made.'),
    speakerIdentification: z
      .array(z.string())
      .describe('Identification of speakers and their contributions.'),
    insights: z.array(z.string()).describe('Key insights from the text.'),
    nextSteps: z.array(z.string()).describe('Actionable next steps.'),
  }).describe('A structured summary of the transcription.'),
});
export type GenerateStructuredSummaryOutput = z.infer<
  typeof GenerateStructuredSummaryOutputSchema
>;

export async function generateStructuredSummary(
  input: GenerateStructuredSummaryInput
): Promise<GenerateStructuredSummaryOutput> {
  return generateStructuredSummaryFlow(input);
}

const structuredSummaryPrompt = ai.definePrompt({
  name: 'structuredSummaryPrompt',
  input: {schema: GenerateStructuredSummaryInputSchema},
  output: {schema: GenerateStructuredSummaryOutputSchema},
  prompt: `You are an expert summarizer. Generate a structured summary of the following transcribed content.

Transcription: {{{transcription}}}

Your summary should include:
- Key Points: The most important points discussed.
- Decisions: Key decisions that were made.
- Speaker Identification: Identification of speakers and their contributions.
- Insights: Key insights derived from the content.
- Next Steps: Actionable next steps that should be taken.

Ensure the summary is concise and easy to understand.`,
});

const generateStructuredSummaryFlow = ai.defineFlow(
  {
    name: 'generateStructuredSummaryFlow',
    inputSchema: GenerateStructuredSummaryInputSchema,
    outputSchema: GenerateStructuredSummaryOutputSchema,
  },
  async input => {
    const {output} = await structuredSummaryPrompt(input);
    return output!;
  }
);
