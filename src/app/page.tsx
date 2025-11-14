'use client';

import Header from '@/components/layout/header';
import Cart from '@/components/cart/cart';
import ChatInterface from '@/components/chat/chat-interface';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col">
        <ChatInterface />
      </main>
      <Cart />
    </div>
  );
}
