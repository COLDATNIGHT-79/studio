'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { DietaryFilter, SpiceLevel } from '@/lib/types';
import { Leaf, Utensils, WheatOff, CandyOff, Flame } from 'lucide-react';

interface FilterBarProps {
  activeDietaryFilters: Set<DietaryFilter>;
  activeSpiceLevels: Set<SpiceLevel>;
  toggleDietaryFilter: (filter: DietaryFilter) => void;
  toggleSpiceLevel: (level: SpiceLevel) => void;
}

const dietaryFilters: { id: DietaryFilter; label: string; icon: React.ElementType }[] = [
  { id: 'vegan', label: 'Vegan', icon: Leaf },
  { id: 'jain', label: 'Jain', icon: Utensils },
  { id: 'gluten-free', label: 'Gluten-Free', icon: WheatOff },
  { id: 'sugar-free', label: 'Sugar-Free', icon: CandyOff },
];

const spiceLevels: { id: SpiceLevel; label: string }[] = [
  { id: 'mild', label: 'Mild' },
  { id: 'medium', label: 'Medium' },
  { id: 'spicy', label: 'Spicy' },
];

export default function FilterBar({
  activeDietaryFilters,
  activeSpiceLevels,
  toggleDietaryFilter,
  toggleSpiceLevel,
}: FilterBarProps) {
  return (
    <div className="mb-8 p-4 bg-card rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg shrink-0">Dietary Options:</h3>
          <div className="flex flex-wrap gap-2">
            {dietaryFilters.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={activeDietaryFilters.has(id) ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleDietaryFilter(id)}
                className="transition-all"
              >
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </Button>
            ))}
          </div>
        </div>

        <Separator orientation="vertical" className="h-8 hidden md:block" />
        
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg shrink-0">Spice Level:</h3>
          <div className="flex flex-wrap gap-2">
            {spiceLevels.map(({ id, label }) => (
              <Button
                key={id}
                variant={activeSpiceLevels.has(id) ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleSpiceLevel(id)}
                className="transition-all"
              >
                <Flame className={`mr-2 h-4 w-4 ${id === 'medium' ? 'text-orange-500' : ''} ${id === 'spicy' ? 'text-red-500' : ''}`} />
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
