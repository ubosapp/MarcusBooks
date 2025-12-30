
export enum BookCategory {
  COLORING = 'Coloring Books',
  WORD_SEARCH = 'Word Search',
  ACTIVITY = 'Activity & Games',
  STORY = 'Story Books'
}

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: BookCategory;
  price: string;
  coverImageUrl: string;
  amazonUrl: string;
  solutionsUrl?: string;
  ageRange: string;
  pages: number;
}

export interface CategoryData {
  title: BookCategory;
  description: string;
  color: string;
  icon: string;
}
