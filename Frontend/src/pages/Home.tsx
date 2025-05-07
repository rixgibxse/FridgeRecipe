import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import RecipeList from '../components/features/recipes/RecipeList';
import { useRecipes } from '../context/RecipeContext';
import Input from '../components/ui/Input';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { recipes, isLoading, favorites, toggleFavorite, searchRecipes } = useRecipes();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchRecipes(searchQuery);
  };

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <div className="py-12 md:py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          What's in your <span className="text-purple-700">fridge</span>?
        </h1>
        <p className="text-xl text-gray-600 max-w-3xxl mx-auto">
          Add the ingredients you have at home, and we'll show you recipes you
          can make right now. <br />No more wondering what to cook!
        </p>
      </div>

      {/* Search Section */}
      <div className="max-w-2xl mx-auto mb-12">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
            icon={<Search className="h-5 w-5" />}
          />
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Recipe Results Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {searchQuery ? 'Search Results' : 'Recommended Recipes'}
          </h2>
          
          {recipes.length > 0 && (
            <a href="#" className="text-purple-600 hover:text-purple-800 flex items-center text-sm font-medium">
              View all recipes
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          )}
        </div>
        
        <RecipeList 
          recipes={recipes}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          isLoading={isLoading}
        />
      </div>

      {/* Feature Section */}
      <div className="py-12 bg-purple-50 rounded-xl mb-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover recipes tailored to your preferences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Search Recipes</h3>
              <p className="text-gray-600">
                Find recipes that match your interests
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Favorites</h3>
              <p className="text-gray-600">
                Keep track of recipes you love for quick access
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Cooking</h3>
              <p className="text-gray-600">
                Follow the recipe instructions and enjoy your meal
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;