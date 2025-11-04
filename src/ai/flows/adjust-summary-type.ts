'use server';

/**
 * @fileOverview A flow for adjusting the summary type of a transcribed content.
 *
 * - adjustSummaryType - A function that adjusts the summary type of a transcribed content.
 * - AdjustSummaryTypeInput - The input type for the adjustSummaryType function.
 * - AdjustSummaryTypeOutput - The return type for the adjustSummaryType function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdjustSummaryTypeInputSchema = z.object({
  transcribedText: z.string().describe('The transcribed text to summarize.'),
  summaryType: z
    .enum(['quick', 'complete', 'executive'])
    .describe('The desired summary type (quick, complete, or executive).'),
});
export type AdjustSummaryTypeInput = z.infer<typeof AdjustSummaryTypeInputSchema>;

const AdjustSummaryTypeOutputSchema = z.object({
  summary: z.string().describe('The generated summary of the transcribed text.'),
});
export type AdjustSummaryTypeOutput = z.infer<typeof AdjustSummaryTypeOutputSchema>;

export async function adjustSummaryType(input: AdjustSummaryTypeInput): Promise<AdjustSummaryTypeOutput> {
  return adjustSummaryTypeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adjustSummaryTypePrompt',
  input: {schema: AdjustSummaryTypeInputSchema},
  output: {schema: AdjustSummaryTypeOutputSchema},
  prompt: `You are an expert summarizer, skilled at creating summaries of varying lengths and detail.

  You will receive a transcribed text and a desired summary type (quick, complete, or executive).
  Generate a summary that is appropriate for the specified summary type.

  - Quick: A brief overview of the main points, suitable for quickly grasping the content.
  - Complete: A detailed summary, including all key information, decisions, speaker identifications, and insights.
  - Executive: A high-level summary, focusing on the most important aspects and next steps for decision-makers.

  Transcribed Text: {{{transcribedText}}}
  Summary Type: {{{summaryType}}}

  Summary:`,
});

const adjustSummaryTypeFlow = ai.defineFlow(
  {
    name: 'adjustSummaryTypeFlow',
    inputSchema: AdjustSummaryTypeInputSchema,
    outputSchema: AdjustSummaryTypeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
