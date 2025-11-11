'use client';

import { useState } from 'react';
import { menuItems } from '@/lib/menu-data';
import type { DietaryFilter, SpiceLevel } from '@/lib/types';
import Header from '@/components/layout/header';
import FilterBar from '@/components/menu/filter-bar';
import MenuGrid from '@/components/menu/menu-grid';
import Cart from '@/components/cart/cart';
import SimilarFoodFAB from '@/components/suggestions/similar-food-fab';

export default function Home() {
  const [activeDietaryFilters, setActiveDietaryFilters] = useState<Set<DietaryFilter>>(new Set());
  const [activeSpiceLevels, setActiveSpiceLevels] = useState<Set<SpiceLevel>>(new Set());

  const toggleDietaryFilter = (filter: DietaryFilter) => {
    setActiveDietaryFilters(prev => {
      const newFilters = new Set(prev);
      if (newFilters.has(filter)) {
        newFilters.delete(filter);
      } else {
        newFilters.add(filter);
      }
      return newFilters;
    });
  };

  const toggleSpiceLevel = (level: SpiceLevel) => {
    setActiveSpiceLevels(prev => {
      const newLevels = new Set(prev);
      if (newLevels.has(level)) {
        newLevels.delete(level);
      } else {
        newLevels.add(level);
      }
      return newLevels;
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <FilterBar
          activeDietaryFilters={activeDietaryFilters}
          activeSpiceLevels={activeSpiceLevels}
          toggleDietaryFilter={toggleDietaryFilter}
          toggleSpiceLevel={toggleSpiceLevel}
        />
        <MenuGrid
          items={menuItems}
          activeDietaryFilters={activeDietaryFilters}
          activeSpiceLevels={activeSpiceLevels}
        />
      </main>
      <Cart />
      <SimilarFoodFAB />
    </div>
  );
}
