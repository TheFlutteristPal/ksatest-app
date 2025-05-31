'use server';

/**
 * @fileOverview Defines a Genkit flow to provide definitions for networking terms.
 *
 * - defineNetworkingTerm - A function that takes a networking term as input and returns its definition.
 * - DefineNetworkingTermInput - The input type for the defineNetworkingTerm function.
 * - DefineNetworkingTermOutput - The return type for the defineNetworkingTerm function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DefineNetworkingTermInputSchema = z.object({
  term: z.string().describe('The networking term to define.'),
});
export type DefineNetworkingTermInput = z.infer<typeof DefineNetworkingTermInputSchema>;

const DefineNetworkingTermOutputSchema = z.object({
  definition: z.string().describe('The definition of the networking term.'),
});
export type DefineNetworkingTermOutput = z.infer<typeof DefineNetworkingTermOutputSchema>;

export async function defineNetworkingTerm(input: DefineNetworkingTermInput): Promise<DefineNetworkingTermOutput> {
  return defineNetworkingTermFlow(input);
}

const prompt = ai.definePrompt({
  name: 'defineNetworkingTermPrompt',
  input: {schema: DefineNetworkingTermInputSchema},
  output: {schema: DefineNetworkingTermOutputSchema},
  prompt: `You are an expert in networking terminology. Please provide a concise and accurate definition for the following term:

Term: {{{term}}}

Definition:`,
});

const defineNetworkingTermFlow = ai.defineFlow(
  {
    name: 'defineNetworkingTermFlow',
    inputSchema: DefineNetworkingTermInputSchema,
    outputSchema: DefineNetworkingTermOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
