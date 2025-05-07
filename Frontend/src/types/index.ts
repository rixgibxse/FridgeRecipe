export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: number; // in minutes
  servings: number;
  tags: string[];
  matchPercentage?: number; // percentage of matching ingredients
}

export interface User {
  id: string;
  email: string;
  name: string;
}