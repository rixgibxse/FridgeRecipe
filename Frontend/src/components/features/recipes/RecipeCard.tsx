import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock, Users } from 'lucide-react';
import Badge from '../../ui/Badge';
import { Recipe } from '../../../types';
import { useAuth } from '../../../context/AuthContext';
import { cn } from '../../../utils/cn';

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: (recipeId: string) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  recipe, 
  isFavorite,
  onToggleFavorite
}) => {
  const { isAuthenticated } = useAuth();
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(recipe.id);
  };

  return (
    <Link 
      to={`/recipe/${recipe.id}`}
      className="block group"
    >
      <div className="overflow-hidden card group-hover:translate-y-[-4px]">
        <div className="relative">
          {/* Recipe Image */}
          <div className="relative h-48 overflow-hidden rounded-t-xl">
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Match percentage badges */}
            {recipe.matchPercentage && (
              <div className="absolute top-0 left-0 m-3">
                <Badge color="success">
                  {recipe.matchPercentage}% Match
                </Badge>
              </div>
            )}
            
            {/* Favorite button */}
            {isAuthenticated && (
              <button
                onClick={handleFavoriteClick}
                className={cn(
                  "absolute top-0 right-0 m-3 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-colors",
                  isFavorite ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-gray-600"
                )}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
              </button>
            )}
          </div>
          
          {/* Recipe Content */}
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
              {recipe.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {recipe.description}
            </p>
            
            {/* Recipe Meta Info */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{recipe.cookingTime} mins</span>
              </div>
              
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{recipe.servings} servings</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;