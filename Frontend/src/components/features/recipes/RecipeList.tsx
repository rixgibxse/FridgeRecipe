import React from 'react';
import RecipeCard from './RecipeCard';
import { Recipe } from '../../../types';

interface RecipeListProps {
  recipes: Recipe[];
  favorites: string[];
  onToggleFavorite: (recipeId: string) => void;
  isLoading?: boolean;
}

const RecipeList: React.FC<RecipeListProps> = ({ 
  recipes, 
  favorites,
  onToggleFavorite,
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-4 animate-pulse">
            <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-1"></div>
            <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
            <div className="flex justify-between">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
        <p className="text-gray-600">
          Try adding different ingredients or fewer restrictions.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isFavorite={favorites.includes(recipe.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default RecipeList;