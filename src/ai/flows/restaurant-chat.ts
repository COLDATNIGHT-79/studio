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
import { format } from 'date-fns';

// We pass the full menu as a string, as it's simpler than a complex object array for the prompt.
const RestaurantChatInputSchema = z.object({
  userQuery: z.string().describe("The user's message to the chatbot."),
  menuJson: z.string().describe('The entire restaurant menu as a JSON string.'),
  conversationHistory: z
    .array(
      z.object({
        role: z.enum(['user', 'model']),
        content: z.string(),
      })
    )
    .optional()
    .describe('The history of the conversation so far.'),
});

export type RestaurantChatInput = z.infer<typeof RestaurantChatInputSchema>;

const RestaurantChatOutputSchema = z.object({
  responseText: z
    .string()
    .describe("The chatbot's text response to the user."),
  suggestedItemIds: z
    .array(z.string())
    .optional()
    .describe(
      'A list of item IDs from the menu that the chatbot is suggesting. This should only be populated when the bot explicitly recommends one or more items.'
    ),
});

export type RestaurantChatOutput = z.infer<typeof RestaurantChatOutputSchema>;

// A simple tool to get today's date and hardcoded festivals.
// In a real app, this could use an API.
const getTodaysEvents = ai.defineTool(
  {
    name: 'getTodaysEvents',
    description:
      'Gets the current date and a list of any notable Indian festivals or special days happening today. Use this to make culturally relevant food suggestions, or to suggest special deals and discounts.',
    inputSchema: z.object({}),
    outputSchema: z.object({
      date: z.string().describe("Today's date."),
      events: z.array(z.string()).describe('A list of festivals or special days happening today.'),
    }),
  },
  async () => {
    const today = new Date();
    const todaysDate = format(today, 'yyyy-MM-dd');
    let events: string[] = [];
    
    // Example festivals - in a real app, you'd use a calendar API
    if (todaysDate.endsWith('-10-29')) {
        events.push('Diwali');
    }
    if (todaysDate.endsWith('-03-25')) {
        events.push('Holi');
    }
    if (todaysDate.endsWith('-02-14')) {
        events.push("Valentine's Day");
    }
    if (todaysDate.endsWith('-11-14')) {
        events.push("Children's Day");
    }
    
    return {
      date: todaysDate,
      events: events,
    };
  }
);


export async function restaurantChat(
  input: RestaurantChatInput
): Promise<RestaurantChatOutput> {
  return restaurantChatFlow(input);
}

const restaurantChatPrompt = ai.definePrompt({
  name: 'restaurantChatPrompt',
  input: { schema: RestaurantChatInputSchema },
  output: { schema: RestaurantChatOutputSchema },
  tools: [getTodaysEvents],
  prompt: `You are a friendly and helpful AI assistant for the "Shelf to Cart Eats" food ordering platform, which hosts menus from various restaurants.
Your goal is to help users find the perfect meal.

First, call the 'getTodaysEvents' tool to check the date and see if there are any special festivals or events.
Use this information to make timely and relevant suggestions.
- For festivals like Diwali, recommend special sweets or festive meals.
- For Valentine's Day, suggest romantic food for couples (e.g., desserts to share, fine dining options).
- For Children's Day, suggest party offers, kid-friendly meals, or combo deals.
- When you find a festival, look for items that have a discount for that occasion and highlight the deal to the user.

You have access to the entire menu from multiple restaurants in JSON format below.
Each item has a 'restaurant' field. When suggesting items, mention which restaurant they are from.
Use this menu to answer questions, find items, and make recommendations.
Be conversational and engaging. If a user asks for a recommendation, ask clarifying questions (e.g., "What are you in the mood for?", "Any dietary preferences?").

If you recommend specific dishes, you MUST include their IDs in the 'suggestedItemIds' field of your response.
Do not make up dishes. Only suggest items that are on the menu.
Prices are in INR.

Here is the full menu data:
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
