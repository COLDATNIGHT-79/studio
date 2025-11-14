'use server';

/**
 * @fileOverview A restaurant chatbot flow that can understand user queries,
 * search the menu, and provide food suggestions.
 *
 * - restaurantChat - The main function to interact with the chatbot.
 * - RestaurantChatInput - The input type for the chatbot, including the user's message and menu data.
 * - RestaurantChatOutput - The output type, containing the bot's text response and suggested item IDs.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { MenuItem } from '@/lib/types';

// We pass the full menu as a string, as it's simpler than a complex object array for the prompt.
const RestaurantChatInputSchema = z.object({
  userQuery: z.string().describe('The user\'s message to the chatbot.'),
  menuJson: z.string().describe('The entire restaurant menu as a JSON string.'),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional().describe('The history of the conversation so far.'),
});

export type RestaurantChatInput = z.infer<typeof RestaurantChatInputSchema>;

const RestaurantChatOutputSchema = z.object({
  responseText: z.string().describe('The chatbot\'s text response to the user.'),
  suggestedItemIds: z
    .array(z.string())
    .optional()
    .describe(
      'A list of item IDs from the menu that the chatbot is suggesting. This should only be populated when the bot explicitly recommends one or more items.'
    ),
});

export type RestaurantChatOutput = z.infer<typeof RestaurantChatOutputSchema>;

export async function restaurantChat(
  input: RestaurantChatInput
): Promise<RestaurantChatOutput> {
  return restaurantChatFlow(input);
}

const restaurantChatPrompt = ai.definePrompt({
  name: 'restaurantChatPrompt',
  input: { schema: RestaurantChatInputSchema },
  output: { schema: RestaurantChatOutputSchema },
  prompt: `You are a friendly and helpful AI assistant for the "Shelf to Cart Eats" restaurant.
Your goal is to help users find the perfect meal.

You have access to the entire menu in JSON format below.
Use this menu to answer questions, find items, and make recommendations.
Be conversational and engaging. If a user asks for a recommendation, ask clarifying questions (e.g., "What are you in the mood for?", "Any dietary preferences?").

If you recommend specific dishes, you MUST include their IDs in the 'suggestedItemIds' field of your response.
Do not make up dishes. Only suggest items that are on the menu.

Here is the full menu:
{{{menuJson}}}

Here is the current conversation history:
{{#if conversationHistory}}
  {{#each conversationHistory}}
    {{role}}: {{content}}
  {{/each}}
{{/if}}

User's latest message:
"{{{userQuery}}}"

Your task is to generate the next response in the conversation.
`,
});

const restaurantChatFlow = ai.defineFlow(
  {
    name: 'restaurantChatFlow',
    inputSchema: RestaurantChatInputSchema,
    outputSchema: RestaurantChatOutputSchema,
  },
  async (input) => {
    const { output } = await restaurantChatPrompt(input);
    return output!;
  }
);
