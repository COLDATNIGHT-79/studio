export type DietaryFilter = 'vegan' | 'jain' | 'gluten-free' | 'sugar-free';
export type SpiceLevel = 'mild' | 'medium' | 'spicy';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  imageHint: string;
  ingredients: string[];
  dietary: DietaryFilter[];
  spiceLevel: SpiceLevel;
  category: string;
  restaurant: string;
  discount?: {
    percentage: number;
    occasion: string; // e.g., "Diwali", "Valentine's Day"
  };
}

export interface CartItem extends MenuItem {
  quantity: number;
}
