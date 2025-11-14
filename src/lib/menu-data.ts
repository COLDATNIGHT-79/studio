import { MenuItem } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
  const img = PlaceHolderImages.find(p => p.id === id);
  return img ? { image: img.imageUrl, imageHint: img.imageHint } : { image: 'https://placehold.co/600x400', imageHint: 'placeholder food' };
};

export const menuItems: MenuItem[] = [
  // Pizzas from "Pizza Palace"
  {
    id: 'margherita-pizza',
    name: 'Margherita Pizza',
    description: 'The classic. Fresh mozzarella, tomatoes, and basil on a crispy crust.',
    price: 450.00,
    ...getImage('margherita-pizza'),
    ingredients: ['Dough', 'Tomato Sauce', 'Mozzarella', 'Basil'],
    dietary: [],
    spiceLevel: 'mild',
    category: 'Pizza',
    restaurant: 'Pizza Palace'
  },
  {
    id: 'pepperoni-pizza',
    name: 'Pepperoni Pizza',
    description: 'A timeless favorite with spicy pepperoni and melted cheese.',
    price: 550.00,
    ...getImage('pepperoni-pizza'),
    ingredients: ['Dough', 'Tomato Sauce', 'Mozzarella', 'Pepperoni'],
    dietary: [],
    spiceLevel: 'medium',
    category: 'Pizza',
    restaurant: 'Pizza Palace'
  },

  // Pastas from "Pasta Perfection"
  {
    id: 'chicken-alfredo-pasta',
    name: 'Chicken Alfredo',
    description: 'Creamy Alfredo sauce with grilled chicken and fettuccine.',
    price: 650.00,
    ...getImage('chicken-alfredo-pasta'),
    ingredients: ['Fettuccine', 'Chicken', 'Cream', 'Parmesan Cheese'],
    dietary: [],
    spiceLevel: 'mild',
    category: 'Pasta',
    restaurant: 'Pasta Perfection'
  },
  {
    id: 'penne-arrabbiata',
    name: 'Penne Arrabbiata',
    description: 'Penne in a fiery tomato sauce with garlic and red chili peppers.',
    price: 520.00,
    ...getImage('penne-arrabbiata'),
    ingredients: ['Penne', 'Tomatoes', 'Garlic', 'Red Chili'],
    dietary: ['vegan'],
    spiceLevel: 'spicy',
    category: 'Pasta',
    restaurant: 'Pasta Perfection'
  },
  
  // Burgers from "Burger Barn"
  {
    id: 'classic-beef-burger',
    name: 'Classic Beef Burger',
    description: 'A juicy all-beef patty with lettuce, tomato, and our special sauce.',
    price: 480.00,
    ...getImage('classic-beef-burger'),
    ingredients: ['Beef Patty', 'Bun', 'Lettuce', 'Tomato', 'Special Sauce'],
    dietary: [],
    spiceLevel: 'mild',
    category: 'Burgers',
    restaurant: 'Burger Barn'
  },
  {
    id: 'veggie-burger',
    name: 'Veggie Burger',
    description: 'A hearty plant-based patty that satisfies any burger craving.',
    price: 420.00,
    ...getImage('veggie-burger'),
    ingredients: ['Veggie Patty', 'Bun', 'Lettuce', 'Tomato'],
    dietary: ['vegan'],
    spiceLevel: 'mild',
    category: 'Burgers',
    restaurant: 'Burger Barn'
  },

  // Indian Curries from "Curry Kingdom"
  {
    id: 'chicken-tikka-masala',
    name: 'Chicken Tikka Masala',
    description: 'Grilled chicken chunks in a rich, creamy tomato sauce.',
    price: 580.00,
    ...getImage('chicken-tikka-masala'),
    ingredients: ['Chicken', 'Tomato', 'Cream', 'Spices'],
    dietary: ['gluten-free'],
    spiceLevel: 'medium',
    category: 'Indian',
    restaurant: 'Curry Kingdom'
  },
  {
    id: 'paneer-butter-masala',
    name: 'Paneer Butter Masala',
    description: 'Soft paneer cubes in a buttery, tomato-based gravy.',
    price: 540.00,
    ...getImage('paneer-butter-masala'),
    ingredients: ['Paneer', 'Tomato', 'Butter', 'Cream', 'Spices'],
    dietary: ['gluten-free'],
    spiceLevel: 'mild',
    category: 'Indian',
    restaurant: 'Curry Kingdom'
  },
  {
    id: 'chana-masala',
    name: 'Chana Masala',
    description: 'A flavorful and spicy chickpea curry.',
    price: 450.00,
    ...getImage('chana-masala'),
    ingredients: ['Chickpeas', 'Tomato', 'Onion', 'Spices'],
    dietary: ['vegan', 'gluten-free', 'sugar-free'],
    spiceLevel: 'medium',
    category: 'Indian',
    restaurant: 'Curry Kingdom'
  },
  {
    id: 'dal-makhani',
    name: 'Dal Makhani',
    description: 'Creamy slow-cooked black lentils with butter and spices.',
    price: 480.00,
    ...getImage('dal-makhani'),
    ingredients: ['Black Lentils', 'Kidney Beans', 'Cream', 'Butter'],
    dietary: ['gluten-free'],
    spiceLevel: 'mild',
    category: 'Indian',
    restaurant: 'Curry Kingdom',
    discount: { percentage: 15, occasion: 'Diwali' }
  },

  // Desserts from "Sweet Somethings"
  {
    id: 'chocolate-lava-cake',
    name: 'Chocolate Lava Cake',
    description: 'A decadent chocolate cake with a molten chocolate center.',
    price: 350.00,
    ...getImage('chocolate-lava-cake'),
    ingredients: ['Chocolate', 'Flour', 'Sugar', 'Egg', 'Butter'],
    dietary: [],
    spiceLevel: 'mild',
    category: 'Desserts',
    restaurant: 'Sweet Somethings',
    discount: { percentage: 20, occasion: "Valentine's Day" }
  },
  {
    id: 'gulab-jamun',
    name: 'Gulab Jamun',
    description: 'Sweet, sticky, and irresistible milk-solid-based sweets.',
    price: 250.00,
    ...getImage('gulab-jamun'),
    ingredients: ['Milk Solids', 'Sugar', 'Rose Water'],
    dietary: [],
    spiceLevel: 'mild',
    category: 'Desserts',
    restaurant: 'Curry Kingdom',
    discount: { percentage: 25, occasion: 'Diwali' }
  },
  {
    id: 'kids-party-combo',
    name: "Kid's Party Combo",
    description: 'A mini pizza, fries, and a juice box. Perfect for the little ones!',
    price: 600.00,
    ...getImage('veggie-delight-pizza'),
    ingredients: ['Pizza', 'Fries', 'Juice'],
    dietary: [],
    spiceLevel: 'mild',
    category: 'Combos',
    restaurant: 'Pizza Palace',
    discount: { percentage: 15, occasion: "Children's Day" }
  },
];
