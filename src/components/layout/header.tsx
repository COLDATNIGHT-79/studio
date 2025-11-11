import Link from 'next/link';
import { UtensilsCrossed } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-card border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
          <UtensilsCrossed className="w-7 h-7" />
          <span>Shelf to Cart Eats</span>
        </Link>
      </div>
    </header>
  );
}
