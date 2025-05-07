import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface IngredientListProps {
  ingredients: string[];
  onRemoveIngredient: (index: number) => void;
  className?: string;
}

const IngredientList: React.FC<IngredientListProps> = ({
  ingredients,
  onRemoveIngredient,
  className
}) => {
  if (ingredients.length === 0) {
    return null;
  }

  return (
    <div className={cn("mt-4", className)}>
      <h3 className="text-sm font-medium text-gray-700 mb-2">
        Your ingredients ({ingredients.length})
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {ingredients.map((ingredient, index) => (
          <div 
            key={`${ingredient}-${index}`}
            className="flex items-center bg-purple-50 text-purple-800 rounded-full px-3 py-1 text-sm"
          >
            <span>{ingredient}</span>
            <button
              type="button"
              onClick={() => onRemoveIngredient(index)}
              className="ml-1.5 text-purple-400 hover:text-purple-600 focus:outline-none"
              aria-label={`Remove ${ingredient}`}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientList;