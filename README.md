# Shelf to Cart Eats

This is a Next.js starter project for a food ordering platform powered by a conversational AI assistant.

## Tech Stack & How It Works

This application is built on a modern, powerful, and scalable tech stack designed for building rich user interfaces and integrating generative AI.

### 1. Frontend Framework - Next.js (with React)

-   **What it is:** The core of your application. Next.js is a React framework that provides a production-ready environment with features like server-side rendering and optimized performance.
-   **How it works:** It renders the user interface components (written in React and TypeScript). We use the **App Router**, which allows for better code organization and performance by rendering components on the server where possible, reducing the amount of JavaScript sent to the user's browser.

### 2. AI & Backend Logic - Genkit

-   **What it is:** Genkit is an open-source framework from Google designed to help you build, test, and run AI-powered features in your applications. Think of it as a "backend toolkit" for generative AI that structures the logic for calling large language models (LLMs).
-   **How it works:** Genkit is used to create "flows" that run on the server. Your main `restaurantChat` flow (`src/ai/flows/restaurant-chat.ts`) defines the AI's personality and gives it access to tools. Key concepts used are:
    -   **Flows (`ai.defineFlow`):** The main entry point for an AI task. The `restaurantChatFlow` orchestrates the entire process of receiving a user query, thinking, and returning a structured response.
    -   **Prompts (`ai.definePrompt`):** This is where the AI gets its instructions. We tell the model how to behave ("You are a friendly AI assistant...") and what kind of output format we expect (e.g., text plus a list of suggested item IDs).
    -   **Tools (`ai.defineTool`):** These are special abilities you give the AI. A tool is a function the AI can *choose* to call to get more information. In this app, `getTodaysEvents` is a tool. The AI is smart enough to check if it's a special day (like Diwali or Valentine's Day) before making a recommendation.

### 3. Styling - Tailwind CSS & ShadCN UI

-   **What they are:** A powerful combination for building beautiful, consistent user interfaces quickly.
-   **How they work:**
    -   **Tailwind CSS** is a utility-first CSS framework. Instead of writing custom CSS, you apply pre-built classes directly to your components (e.g., `bg-primary`, `p-4`, `rounded-lg`).
    -   **ShadCN UI** provides a set of reusable, accessible, and themeable components (like `Button`, `Card`, `Dialog`) built on top of Tailwind CSS. The theme colors are centrally managed in `src/app/globals.css`.

### 4. State Management - React Context

-   **What it is:** A built-in React feature for sharing state across multiple components.
-   **How it works:** We use a `CartProvider` (`src/context/cart-context.tsx`) to manage the shopping cart. Any component in the app can access the cart's contents, add items, or get the total price by using the `useCart()` hook. This keeps all cart-related logic clean and centralized.

---

### How It All Works Together: A User's Journey

1.  A user visits the homepage (`src/app/page.tsx`) and loads the `ChatInterface`.
2.  The user types a message (e.g., "I'm looking for something spicy").
3.  The `ChatInterface` calls the `restaurantChat` server function, which runs the **Genkit** flow.
4.  The Genkit flow first calls its `getTodaysEvents` tool to check for festivals.
5.  It then sends the user's query, the conversation history, the menu data, and any festival information to the Google AI model.
6.  The AI analyzes everything and generates a helpful text response and a structured list of suggested `menuItemIds`.
7.  The chat UI updates with the AI's response and displays the suggested food items.
8.  When the user clicks "Add to Cart," the `useCart()` hook updates the global cart state.
9.  The `Cart` component automatically updates to show the new item and total price (in INR), applying any relevant festival discounts.
10. At checkout, a dynamic QR code is generated using your Paytm UPI ID and the final cart total for payment.
