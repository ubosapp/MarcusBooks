
import { Book, BookCategory, CategoryData } from './types';

export const BOOKS_DATA: Book[] = [
  {
    id: '1',
    title: 'Colorful World of Puppies',
    subtitle: 'Over 50 adorable animal designs',
    description: 'A magical journey through nature, perfect for developing coordination and creativity in the little ones.',
    category: BookCategory.COLORING,
    price: '$6.99',
    coverImageUrl: 'https://picsum.photos/seed/coloring1/400/600',
    amazonUrl: 'https://www.amazon.com',
    ageRange: '3-6 years',
    pages: 64
  },
  {
    id: '2',
    title: 'Word Search: Adventure Safari',
    subtitle: 'Find hidden words in the jungle!',
    description: 'Challenge your mind with 100 word search puzzles themed around wild animals. Guaranteed fun!',
    category: BookCategory.WORD_SEARCH,
    price: '$8.50',
    coverImageUrl: 'https://picsum.photos/seed/ws1/400/600',
    amazonUrl: 'https://www.amazon.com',
    solutionsUrl: 'solutions/safari',
    ageRange: '7-12 years',
    pages: 120
  },
  {
    id: '3',
    title: 'Dinosaur Coloring Fun',
    subtitle: 'Return to the Jurassic Era',
    description: 'T-Rex, Triceratops, and many others ready to be brought to life with your favorite colors.',
    category: BookCategory.COLORING,
    price: '$7.20',
    coverImageUrl: 'https://picsum.photos/seed/dino/400/600',
    amazonUrl: 'https://www.amazon.com',
    ageRange: '4-8 years',
    pages: 50
  },
  {
    id: '4',
    title: 'Crosswords for Little Geniuses',
    subtitle: 'Train your logic while having fun',
    description: 'Puzzles and linguistic riddles for kids who love intellectual challenges.',
    category: BookCategory.WORD_SEARCH,
    price: '$9.00',
    coverImageUrl: 'https://picsum.photos/seed/genius/400/600',
    amazonUrl: 'https://www.amazon.com',
    solutionsUrl: 'solutions/geni',
    ageRange: '8-11 years',
    pages: 90
  }
];

export const CATEGORIES: CategoryData[] = [
  {
    title: BookCategory.COLORING,
    description: 'Express your creativity with unique designs.',
    color: 'bg-orange-400',
    icon: '🎨'
  },
  {
    title: BookCategory.WORD_SEARCH,
    description: 'Challenge your eyes and learn new words.',
    color: 'bg-purple-500',
    icon: '🔍'
  }
];
