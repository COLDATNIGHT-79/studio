import { MenuItem } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
  const img = PlaceHolderImages.find(p => p.id === id);
  return img ? { image: img.imageUrl, imageHint: img.imageHint } : { image: 'https://placehold.co/600x400', imageHint: 'placeholder food' };
};

export const menuItems: MenuItem[] = [
  // Pizzas
  {
    id: 'margherita-pizza',
    name: 'Margherita Pizza',
    description: 'The classic. Fresh mozzarella, tomatoes, and basil on a crispy crust.',
    price: 12.99,
    ...getImage('margherita-pizza'),
    ingredients: ['Dough', 'Tomato Sauce', 'Mozzarella', 'Basil'],
    dietary: [],
    spiceLevel: 'mild',
    category: 'Pizza'
  },
  {
    id: 'pepperoni-pizza',
    name: 'Pepperoni Pizza',
    description: 'A timeless favorite with spicy pepperoni and melted cheese.',
    price: 14.99,
    ...getImage('pepperoni-pizza'),
    ingredients: ['Dough', 'Tomato Sauce', 'Mozzarella', 'Pepperoni'],
    dietary: [],
    spiceLevel: 'medium',
    category: 'Pizza'
  },
  {
    id: 'veggie-delight-pizza',
    name: 'Veggie Delight Pizza',
    description: 'Loaded with bell peppers, onions, olives, and mushrooms.',
    price: 15.99,
    ...getImage('veggie-delight-pizza'),
    ingredients: ['Dough', 'Tomato Sauce', 'Mozzarella', 'Bell Peppers', 'Onions', 'Olives', 'Mushrooms'],
    dietary: ['vegan'],
    spiceLevel: 'mild',
    category: 'Pizza'
  },

  // Pastas
  {
    id: 'chicken-alfredo-pasta',
    name: 'Chicken Alfredo',
    description: 'Creamy Alfredo sauce with grilled chicken and fettuccine.',
    price: 16.99,
    ...getImage('chicken-alfredo-pasta'),
    ingredients: ['Fettuccine', 'Chicken', 'Cream', 'Parmesan Cheese'],
    dietary: [],
    spiceLevel: 'mild',
    category: 'Pasta'
  },
  {
    id: 'penne-arrabbiata',
    name: 'Penne Arrabbiata',
    description: 'Penne in a fiery tomato sauce with garlic and red chili peppers.',
    price: 13.99,
    ...getImage('penne-arrabbiata'),
    ingredients: ['Penne', 'Tomatoes', 'Garlic', 'Red Chili'],
    dietary: ['vegan'],
    spiceLevel: 'spicy',
    category: 'Pasta'
  },
  
  // Burgers
  {
    id: 'classic-beef-burger',
    name: 'Classic Beef Burger',
    description: 'A juicy all-beef patty with lettuce, tomato, and our special sauce.',
    price: 11.99,
    ...getImage('classic-beef-burger'),
    ingredients: ['Beef Patty', 'Bun', 'Lettuce', 'Tomato', 'Special Sauce'],
    dietary: [],
    spiceLevel: 'mild',
    category: 'Burgers'
  },
  {
    id: 'veggie-burger',
    name: 'Veggie Burger',
    description: 'A hearty plant-based patty that satisfies any burger craving.',
    price: 10.99,
    ...getImage('veggie-burger'),
    ingredients: ['Veggie Patty', 'Bun', 'Lettuce', 'Tomato'],
    dietary: ['vegan'],
    spiceLevel: 'mild',
    category: 'Burgers'
  },

  // Indian Curries
  {
    id: 'chicken-tikka-masala',
    name: 'Chicken Tikka Masala',
    description: 'Grilled chicken chunks in a rich, creamy tomato sauce.',
    price: 15.50,
    ...getImage('chicken-tikka-masala'),
    ingredients: ['Chicken', 'Tomato', 'Cream', 'Spices'],
    dietary: ['gluten-free'],
    spiceLevel: 'medium',
    category: 'Indian'
  },
  {
    id: 'paneer-butter-masala',
    name: 'Paneer Butter Masala',
    description: 'Soft paneer cubes in a buttery, tomato-based gravy.',
    price: 14.50,
    ...getImage('paneer-butter-masala'),
    ingredients: ['Paneer', 'Tomato', 'Butter', 'Cream', 'Spices'],
    dietary: ['gluten-free'],
    spiceLevel: 'mild',
    category: 'Indian'
  },
  {
    id: 'chana-masala',
    name: 'Chana Masala',
    description: 'A flavorful and spicy chickpea curry.',
    price: 12.50,
    ...getImage('chana-masala'),
    ingredients: ['Chickpeas', 'Tomato', 'Onion', 'Spices'],
    dietary: ['vegan', 'gluten-free', 'sugar-free'],
    spiceLevel: 'medium',
    category: 'Indian'
  },
  {
    id: 'dal-makhani',
    name: 'Dal Makhani',
    description: 'Creamy slow-cooked black lentils with butter and spices.',
    price: 13.00,
    ...getImage('dal-makhani'),
    ingredients: ['Black Lentils', 'Kidney Beans', 'Cream', 'Butter'],
    dietary: ['gluten-free'],
    spiceLevel: 'mild',
    category: 'Indian'
  },
  {
    id: 'palak-paneer',
    name: 'Palak Paneer',
    description: 'Paneer in a thick paste made from puréed spinach.',
    price: 14.00,
    ...getImage('palak-paneer'),
    ingredients: ['Spinach', 'Paneer', 'Onion', 'Spices'],
    dietary: ['gluten-free', 'jain', 'sugar-free'],
    spiceLevel: 'mild',
    category: 'Indian'
  },

  // Mexican
  {
    id: 'chicken-quesadilla',
    name: 'Chicken Quesadilla',
    description: 'A warm tortilla filled with chicken and melted cheese.',
    price: 9.99,
    ...getImage('chicken-quesadilla'),
    ingredients: ['Tortilla', 'Chicken', 'Cheese', 'Peppers'],
    dietary: [],
    spiceLevel: 'mild',
    category: 'Mexican'
  },
  {
    id: 'fish-tacos',
    name: 'Fish Tacos',
    description: 'Crispy fish, cabbage slaw, and a creamy sauce in a corn tortilla.',
    price: 12.99,
    ...getImage('fish-tacos'),
    ingredients: ['Fish', 'Corn Tortilla', 'Cabbage', 'Creamy Sauce'],
    dietary: [],
    spiceLevel: 'medium',
    category: 'Mexican'
  },

  // Starters
  {
    id: 'samosa',
    name: 'Samosa (2 pcs)',
    description: 'Fried pastry with a savory filling of spiced potatoes and peas.',
    price: 4.99,
    ...getImage('samosa'),
    ingredients: ['Potato', 'Peas', 'Spices', 'Flour'],
    dietary: ['vegan'],
    spiceLevel: 'medium',
    category: 'Starters'
  },
  {
    id: 'french-fries',
    name: 'French Fries',
    description: 'Perfectly crispy and salted to perfection.',
    price: 3.99,
    ...getImage('french-fries'),
    ingredients: ['Potato', 'Oil', 'Salt'],
    dietary: ['vegan', 'gluten-free'],
    spiceLevel: 'mild',
    category: 'Starters'
  },
  {
    id: 'mozzarella-sticks',
    name: 'Mozzarella Sticks',
    description: 'Golden-fried mozzarella served with marinara sauce.',
    price: 7.99,
    ...getImage('mozzarella-sticks'),
    ingredients: ['Mozzarella', 'Breadcrumbs', 'Egg'],
    dietary: [],
    spiceLevel: 'mild',
    category: 'Starters'
  },

  // Salads
  {
    id: 'caesar-salad',
    name: 'Caesar Salad',
    description: 'Crisp romaine, creamy Caesar dressing, parmesan, and croutons.',
    price: 9.50,
    ...getImage('caesar-salad'),
    ingredients: ['Romaine Lettuce', 'Croutons', 'Parmesan', 'Caesar Dressing'],
    dietary: [],
    spiceLevel: 'mild',
    category: 'Salads'
  },
  {
    id: 'greek-salad',
    name: 'Greek Salad',
    description: 'Tomatoes, cucumbers, olives, and feta cheese with a vinaigrette.',
    price: 10.50,
    ...getImage('greek-salad'),
    ingredients: ['Tomato', 'Cucumber', 'Olives', 'Feta Cheese'],
    dietary: ['gluten-free'],
    spiceLevel: 'mild',
    category: 'Salads'
  },

  // Breads
  {
    id: 'garlic-naan',
    name: 'Garlic Naan',
    description: 'Soft Indian bread topped with fresh garlic and butter.',
    price: 3.50,
    ...getImage('garlic-naan'),
    ingredients: ['Flour', 'Yogurt', 'Garlic', 'Butter'],
    dietary: [],
    spiceLevel: 'mild',
    category: 'Breads'
  },
  
  // Rice
  {
    id: 'chicken-biryani',
    name: 'Chicken Biryani',
    description: 'Aromatic basmati rice cooked with chicken and exotic spices.',
    price: 16.00,
    ...getImage('chicken-biryani'),
    ingredients: ['Basmati Rice', 'Chicken', 'Spices', 'Yogurt'],
    dietary: ['gluten-free'],
    spiceLevel: 'spicy',
    category: 'Rice'
  },
  {
    id: 'vegetable-biryani',
    name: 'Vegetable Biryani',
    description: 'A fragrant rice dish packed with fresh vegetables and spices.',
    price: 14.00,
    ...getImage('vegetable-biryani'),
    ingredients: ['Basmati Rice', 'Mixed Vegetables', 'Spices', 'Yogurt'],
    dietary: ['vegan', 'gluten-free'],
    spiceLevel: 'medium',
    category: 'Rice'
  },
  {
    id: 'rajma-chawal',
    name: 'Rajma Chawal',
    description: 'A comforting meal of kidney bean curry with steamed rice.',
    price: 12.00,
    ...getImage('rajma-chawal'),
    ingredients: ['Kidney Beans', 'Rice', 'Tomato', 'Onion'],
    dietary: ['vegan', 'gluten-free', 'sugar-free'],
    spiceLevel: 'medium',
    category: 'Rice'
  },

  // Desserts
  {
    id: 'chocolate-lava-cake',
    name: 'Chocolate Lava Cake',
    description: 'A decadent chocolate cake with a molten chocolate center.',
    price: 8.99,
    ...getImage('chocolate-lava-cake'),
    ingredients: ['Chocolate', 'Flour', 'Sugar', 'Egg', 'Butter'],
    dietary: [],
    spiceLevel: 'mild',
    category: 'Desserts'
  },
  {
    id: 'new-york-cheesecake',
    name: 'New York Cheesecake',
    description: 'Rich, dense, and creamy cheesecake with a graham cracker crust.',
    price: 7.99,
    ...getImage('new-york-cheesecake'),
    ingredients: ['Cream Cheese', 'Sugar', 'Egg', 'Graham Cracker'],
    dietary: [],
    spiceLevel: 'mild',
    category: 'Desserts'
  },
  {
    id: 'gulab-jamun',
    name: 'Gulab Jamun',
    description: 'Sweet, sticky, and irresistible milk-solid-based sweets.',
    price: 5.50,
    ...getImage('gulab-jamun'),
    ingredients: ['Milk Solids', 'Sugar', 'Rose Water'],
    dietary: [],
    spiceLevel: 'mild',
    category: 'Desserts'
  },

  // Drinks
  {
    id: 'mango-lassi',
    name: 'Mango Lassi',
    description: 'A refreshing and creamy yogurt-based mango shake.',
    price: 4.50,
    ...getImage('mango-lassi'),
    ingredients: ['Yogurt', 'Mango', 'Sugar'],
    dietary: ['gluten-free'],
    spiceLevel: 'mild',
    category: 'Drinks'
  },
  {
    id: 'coca-cola',
    name: 'Coca-Cola',
    description: 'The classic refreshing soft drink.',
    price: 2.50,
    ...getImage('coca-cola'),
    ingredients: ['Carbonated Water', 'Sugar', 'Caffeine'],
    dietary: ['vegan', 'gluten-free'],
    spiceLevel: 'mild',
    category: 'Drinks'
  },
  {
    id: 'fresh-lime-soda',
    name: 'Fresh Lime Soda',
    description: 'A zesty and bubbly drink, available sweet or salted.',
    price: 3.50,
    ...getImage('fresh-lime-soda'),
    ingredients: ['Lime', 'Soda Water', 'Sugar/Salt'],
    dietary: ['vegan', 'gluten-free', 'sugar-free'],
    spiceLevel: 'mild',
    category: 'Drinks'
  },
  {
    id: 'jain-thali',
    name: 'Jain Thali',
    description: 'A complete meal with multiple Jain-friendly dishes.',
    price: 18.00,
    ...getImage('pav-bhaji'), // using another image
    ingredients: ['Various Vegetables', 'Lentils', 'Spices', 'Chapatti'],
    dietary: ['jain', 'vegan', 'sugar-free'],
    spiceLevel: 'medium',
    category: 'Indian'
  },
  {
    id: 'gluten-free-roti',
    name: 'Gluten-Free Roti',
    description: 'Indian flatbread made with gluten-free flour.',
    price: 4.00,
    ...getImage('garlic-naan'), // using another image
    ingredients: ['Millet Flour', 'Water', 'Salt'],
    dietary: ['gluten-free', 'vegan', 'sugar-free'],
    spiceLevel: 'mild',
    category: 'Breads'
  },
  {
    id: 'sugar-free-kheer',
    name: 'Sugar-Free Kheer',
    description: 'A creamy rice pudding made without sugar, sweetened naturally.',
    price: 6.00,
    ...getImage('rasmalai'), // using another image
    ingredients: ['Rice', 'Milk', 'Stevia', 'Cardamom'],
    dietary: ['sugar-free', 'gluten-free'],
    spiceLevel: 'mild',
    category: 'Desserts'
  },
  {
    id: 'spaghetti-aglio-e-olio',
    name: 'Spaghetti Aglio e Olio',
    description: 'Simple yet delicious pasta with garlic, olive oil, and chili flakes.',
    price: 12.50,
    ...getImage('spaghetti-bolognese'),
    ingredients: ['Spaghetti', 'Garlic', 'Olive Oil', 'Chili Flakes'],
    dietary: ['vegan'],
    spiceLevel: 'medium',
    category: 'Pasta'
  },
  {
    id: 'crispy-chicken-sandwich',
    name: 'Crispy Chicken Sandwich',
    description: 'A perfectly fried chicken breast on a brioche bun with pickles.',
    price: 12.50,
    ...getImage('crispy-chicken-sandwich'),
    ingredients: ['Chicken Breast', 'Brioche Bun', 'Pickles', 'Mayonnaise'],
    dietary: [],
    spiceLevel: 'mild',
    category: 'Burgers'
  },
  {
    id: 'mutton-rogan-josh',
    name: 'Mutton Rogan Josh',
    description: 'Tender mutton pieces in a fragrant and rich gravy.',
    price: 18.50,
    ...getImage('mutton-rogan-josh'),
    ingredients: ['Mutton', 'Yogurt', 'Spices', 'Onion'],
    dietary: ['gluten-free'],
    spiceLevel: 'spicy',
    category: 'Indian'
  },
  {
    id: 'hakka-noodles',
    name: 'Veg Hakka Noodles',
    description: 'Stir-fried noodles with a medley of fresh vegetables.',
    price: 11.50,
    ...getImage('hakka-noodles'),
    ingredients: ['Noodles', 'Cabbage', 'Carrots', 'Bell Pepper', 'Soy Sauce'],
    dietary: ['vegan'],
    spiceLevel: 'medium',
    category: 'Chinese'
  },
  {
    id: 'manchurian-gravy',
    name: 'Veg Manchurian Gravy',
    description: 'Vegetable fritters in a savory and tangy brown sauce.',
    price: 13.50,
    ...getImage('manchurian-gravy'),
    ingredients: ['Mixed Vegetable Balls', 'Soy Sauce', 'Ginger', 'Garlic'],
    dietary: ['vegan'],
    spiceLevel: 'medium',
    category: 'Chinese'
  },
  {
    id: 'tomato-soup',
    name: 'Cream of Tomato Soup',
    description: 'A classic, comforting soup made from ripe tomatoes and cream.',
    price: 6.50,
    ...getImage('tomato-soup'),
    ingredients: ['Tomato', 'Cream', 'Herbs'],
    dietary: ['gluten-free'],
    spiceLevel: 'mild',
    category: 'Soups'
  },
  {
    id: 'pav-bhaji',
    name: 'Pav Bhaji',
    description: 'A spicy mash of mixed vegetables, served with soft buttered buns.',
    price: 10.00,
    ...getImage('pav-bhaji'),
    ingredients: ['Mixed Vegetables', 'Potato', 'Onion', 'Spices', 'Bread Buns'],
    dietary: [],
    spiceLevel: 'medium',
    category: 'Indian'
  },
  {
    id: 'chole-bhature',
    name: 'Chole Bhature',
    description: 'A combination of spicy chickpeas and fluffy, fried bread.',
    price: 11.00,
    ...getImage('chole-bhature'),
    ingredients: ['Chickpeas', 'Flour', 'Spices', 'Yogurt'],
    dietary: [],
    spiceLevel: 'spicy',
    category: 'Indian'
  },
  {
    id: 'sushi-california-roll',
    name: 'California Roll',
    description: 'An iconic sushi roll with imitation crab, avocado, and cucumber.',
    price: 9.00,
    ...getImage('sushi-california-roll'),
    ingredients: ['Rice', 'Nori', 'Imitation Crab', 'Avocado', 'Cucumber'],
    dietary: [],
    spiceLevel: 'mild',
    category: 'Sushi'
  },
  {
    id: 'sushi-spicy-tuna-roll',
    name: 'Spicy Tuna Roll',
    description: 'Tuna mixed with a spicy mayonnaise, rolled with cucumber.',
    price: 10.00,
    ...getImage('sushi-spicy-tuna-roll'),
    ingredients: ['Rice', 'Nori', 'Tuna', 'Spicy Mayo', 'Cucumber'],
    dietary: [],
    spiceLevel: 'spicy',
    category: 'Sushi'
  },
  {
    id: 'sushi-avocado-roll',
    name: 'Avocado Roll',
    description: 'A simple and creamy roll filled with fresh avocado.',
    price: 7.00,
    ...getImage('sushi-avocado-roll'),
    ingredients: ['Rice', 'Nori', 'Avocado'],
    dietary: ['vegan', 'gluten-free'],
    spiceLevel: 'mild',
    category: 'Sushi'
  },
  {
    id: 'iced-tea',
    name: 'Iced Tea',
    description: 'Chilled tea, lightly sweetened for a refreshing drink.',
    price: 3.00,
    ...getImage('iced-tea'),
    ingredients: ['Black Tea', 'Water', 'Sugar'],
    dietary: ['vegan', 'gluten-free'],
    spiceLevel: 'mild',
    category: 'Drinks'
  },
  {
    id: 'onion-rings',
    name: 'Onion Rings',
    description: 'Crispy, beer-battered onion rings with a side of dipping sauce.',
    price: 6.50,
    ...getImage('onion-rings'),
    ingredients: ['Onion', 'Flour', 'Beer', 'Spices'],
    dietary: [],
    spiceLevel: 'mild',
    category: 'Starters'
  },
  {
    id: 'sweet-corn-soup',
    name: 'Sweet Corn Soup',
    description: 'A creamy and comforting soup with kernels of sweet corn.',
    price: 6.50,
    ...getImage('sweet-corn-soup'),
    ingredients: ['Corn', 'Vegetable Broth', 'Cream'],
    dietary: ['gluten-free'],
    spiceLevel: 'mild',
    category: 'Soups'
  },
  {
    id: 'masala-dosa',
    name: 'Masala Dosa',
    description: 'A crispy fermented crepe filled with spiced potatoes.',
    price: 10.50,
    ...getImage('masala-dosa'),
    ingredients: ['Rice', 'Lentils', 'Potato', 'Onion', 'Spices'],
    dietary: ['vegan', 'gluten-free'],
    spiceLevel: 'medium',
    category: 'Indian'
  },
  {
    id: 'idli-sambar',
    name: 'Idli Sambar',
    description: 'Steamed savory rice cakes served with a tangy lentil stew.',
    price: 8.50,
    ...getImage('idli-sambar'),
    ingredients: ['Rice', 'Urad Dal', 'Toor Dal', 'Vegetables', 'Tamarind'],
    dietary: ['vegan', 'gluten-free', 'sugar-free'],
    spiceLevel: 'medium',
    category: 'Indian'
  },
  {
    id: 'tacos-al-pastor',
    name: 'Tacos Al Pastor',
    description: 'Spit-grilled pork tacos with pineapple, onions, and cilantro.',
    price: 13.50,
    ...getImage('tacos-al-pastor'),
    ingredients: ['Pork', 'Corn Tortilla', 'Pineapple', 'Onion', 'Cilantro'],
    dietary: ['gluten-free'],
    spiceLevel: 'medium',
    category: 'Mexican'
  },
];
