'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating highlight clips from transcribed text.
 *
 * The flow takes selected sections of transcribed text and generates short text or video highlights.
 *   - generateHighlightClip - A function that generates highlight clips from transcribed text.
 *   - GenerateHighlightClipInput - The input type for the generateHighlightClip function.
 *   - GenerateHighlightClipOutput - The return type for the generateHighlightClip function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHighlightClipInputSchema = z.object({
  transcribedText: z
    .string()
    .describe('The full transcribed text from which to extract highlights.'),
  selectedText: z
    .string()
    .describe('The specific section of text selected for highlighting.'),
  outputType: z
    .enum(['text', 'video'])
    .describe('The desired output type: text or video.'),
});

export type GenerateHighlightClipInput = z.infer<
  typeof GenerateHighlightClipInputSchema
>;

const GenerateHighlightClipOutputSchema = z.object({
  highlight: z.string().describe('The generated highlight clip (text or video).'),
});

export type GenerateHighlightClipOutput = z.infer<
  typeof GenerateHighlightClipOutputSchema
>;

export async function generateHighlightClip(
  input: GenerateHighlightClipInput
): Promise<GenerateHighlightClipOutput> {
  return generateHighlightClipFlow(input);
}

const generateHighlightClipPrompt = ai.definePrompt({
  name: 'generateHighlightClipPrompt',
  input: {schema: GenerateHighlightClipInputSchema},
  output: {schema: GenerateHighlightClipOutputSchema},
  prompt: `You are an expert content highlighter. You take transcribed text and create highlights, in text or video format, from selected sections.

      Transcribed Text: {{{transcribedText}}}
      Selected Text: {{{selectedText}}}

      Based on the selected text from the transcribed text, create a short highlight in {{{outputType}}} format.
      If the outputType is text, create a concise summary of the selected text.
      If the outputType is video, describe the scene that should be included in the video highlight.
      `,
});

const generateHighlightClipFlow = ai.defineFlow(
  {
    name: 'generateHighlightClipFlow',
    inputSchema: GenerateHighlightClipInputSchema,
    outputSchema: GenerateHighlightClipOutputSchema,
  },
  async input => {
    if (input.outputType === 'video') {
      const {output} = await generateHighlightClipPrompt(input);
      // Just in case the LLM hallucinated a base64 encoded video, ensure that it only returns text
      return {highlight: output!.highlight};
    } else {
      const {output} = await generateHighlightClipPrompt(input);
      return output!;
    }
  }
);
