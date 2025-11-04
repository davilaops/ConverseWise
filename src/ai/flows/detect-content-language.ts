'use server';

/**
 * @fileOverview This file defines a Genkit flow for detecting the language of audio/video content.
 *
 * The flow takes audio/video content as input and returns the detected language.
 * This eliminates the need for users to manually specify the language before transcribing.
 *
 * @param {DetectContentLanguageInput} input - The input to the flow, which contains the audio/video content.
 * @returns {Promise<DetectContentLanguageOutput>} - The detected language.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectContentLanguageInputSchema = z.object({
  contentDataUri: z
    .string()
    .describe(
      "The audio/video content as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type DetectContentLanguageInput = z.infer<typeof DetectContentLanguageInputSchema>;

const DetectContentLanguageOutputSchema = z.object({
  languageCode: z.string().describe('The detected language code (e.g., en, pt).'),
});
export type DetectContentLanguageOutput = z.infer<typeof DetectContentLanguageOutputSchema>;

export async function detectContentLanguage(input: DetectContentLanguageInput): Promise<DetectContentLanguageOutput> {
  return detectContentLanguageFlow(input);
}

const detectLanguagePrompt = ai.definePrompt({
  name: 'detectLanguagePrompt',
  input: {schema: DetectContentLanguageInputSchema},
  output: {schema: DetectContentLanguageOutputSchema},
  prompt: `You are an expert in language detection.
  Given the following audio/video content, identify the language spoken and return the language code.
  Content: {{media url=contentDataUri}}
  Respond with just the language code. For example, if the language is English, respond with 'en'. If the language is Portuguese, respond with 'pt'.`,
});

const detectContentLanguageFlow = ai.defineFlow(
  {
    name: 'detectContentLanguageFlow',
    inputSchema: DetectContentLanguageInputSchema,
    outputSchema: DetectContentLanguageOutputSchema,
  },
  async input => {
    const {output} = await detectLanguagePrompt(input);
    return output!;
  }
);
