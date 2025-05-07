import React, { useState } from 'react';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { Plus, Search } from 'lucide-react';

interface IngredientInputProps {
  onAddIngredient: (ingredient: string) => void;
  onSearch: () => void;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ 
  onAddIngredient,
  onSearch
}) => {
  const [ingredient, setIngredient] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ingredient.trim()) {
      onAddIngredient(ingredient.trim());
      setIngredient('');
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        What's in your fridge?
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Enter an ingredient (e.g., chicken, onion, etc.)"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          className="w-full"
        />
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            type="submit" 
            variant="outline"
            leftIcon={<Plus size={18} />}
            className="flex-1"
          >
            Add Ingredient
          </Button>
          
          <Button 
            type="button" 
            variant="primary"
            leftIcon={<Search size={18} />}
            className="flex-1"
            onClick={onSearch}
          >
            Find Recipes
          </Button>
        </div>
      </form>

      {/* This is where the backend API integration would happen */}
      {/* 
        API endpoint would be:
        POST /api/recipes/search with ingredients array in request body
      */}
    </div>
  );
};

export default IngredientInput;