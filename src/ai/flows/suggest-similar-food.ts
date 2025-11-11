'use server';

/**
 * @fileOverview A flow for suggesting similar food items based on ingredients, dietary information, and popularity.
 *
 * - suggestSimilarFood - A function that handles the process of suggesting similar food items.
 * - SuggestSimilarFoodInput - The input type for the suggestSimilarFood function.
 * - SuggestSimilarFoodOutput - The return type for the suggestSimilarFood function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSimilarFoodInputSchema = z.object({
  foodName: z.string().describe('The name of the food item added to the cart.'),
  ingredients: z.array(z.string()).describe('List of ingredients in the food item.'),
  dietaryInfo: z
    .array(z.string())
    .describe('Dietary information such as gluten-free, vegan, etc.'),
  popularityScore: z
    .number()
    .optional()
    .describe('A score representing the popularity of the food item.'),
});

export type SuggestSimilarFoodInput = z.infer<typeof SuggestSimilarFoodInputSchema>;

const SuggestSimilarFoodOutputSchema = z.array(z.object({
  name: z.string().describe('Name of the suggested food item.'),
  ingredients: z.array(z.string()).describe('Ingredients of the suggested food item.'),
  dietaryInfo: z
    .array(z.string())
    .describe('Dietary information for the suggested food item.'),
  similarityScore: z
    .number()
    .describe('A score indicating how similar the suggested item is.'),
}));

export type SuggestSimilarFoodOutput = z.infer<typeof SuggestSimilarFoodOutputSchema>;

export async function suggestSimilarFood(input: SuggestSimilarFoodInput): Promise<SuggestSimilarFoodOutput> {
  return suggestSimilarFoodFlow(input);
}

const suggestSimilarFoodPrompt = ai.definePrompt({
  name: 'suggestSimilarFoodPrompt',
  input: {schema: SuggestSimilarFoodInputSchema},
  output: {schema: SuggestSimilarFoodOutputSchema},
  prompt: `Suggest food items similar to {{foodName}}, considering the following:

  Ingredients: {{{ingredients}}}
  Dietary Info: {{{dietaryInfo}}}
  Popularity Score: {{{popularityScore}}}

  Provide a list of similar food items with their ingredients, dietary information, and a similarity score (0-1) indicating how similar they are to the input food item.  Return the results as a JSON array.
`,
});

const suggestSimilarFoodFlow = ai.defineFlow(
  {
    name: 'suggestSimilarFoodFlow',
    inputSchema: SuggestSimilarFoodInputSchema,
    outputSchema: SuggestSimilarFoodOutputSchema,
  },
  async input => {
    const {output} = await suggestSimilarFoodPrompt(input);
    return output!;
  }
);
