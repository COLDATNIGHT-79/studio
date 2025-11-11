'use client';

import { useMemo } from 'react';
import type { MenuItem, DietaryFilter, SpiceLevel } from '@/lib/types';
import MenuItemCard from './menu-item-card';

interface MenuGridProps {
  items: MenuItem[];
  activeDietaryFilters: Set<DietaryFilter>;
  activeSpiceLevels: Set<SpiceLevel>;
}

export default function MenuGrid({
  items,
  activeDietaryFilters,
  activeSpiceLevels,
}: MenuGridProps) {
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const dietaryMatch =
        activeDietaryFilters.size === 0 ||
        Array.from(activeDietaryFilters).every(filter => item.dietary.includes(filter));
      
      const spiceMatch =
        activeSpiceLevels.size === 0 || activeSpiceLevels.has(item.spiceLevel);
        
      return dietaryMatch && spiceMatch;
    });
  }, [items, activeDietaryFilters, activeSpiceLevels]);

  return (
    <div>
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-300">
          {filteredItems.map(item => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-muted-foreground">No Dishes Found</h2>
          <p className="mt-2 text-muted-foreground">Try adjusting your filters to find your perfect meal!</p>
        </div>
      )}
    </div>
  );
}
