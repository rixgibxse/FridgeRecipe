import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ChefHat } from 'lucide-react';
import RecipeList from '../components/features/recipes/RecipeList';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const Favorites: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { favoriteRecipes, favorites, toggleFavorite } = useRecipes();
  const navigate = useNavigate();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-16">
          <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="h-10 w-10 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            No favorites yet
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto mb-8">
            You haven't saved any recipes to your favorites yet. Start exploring recipes and save the ones you love!
          </p>
          <Button
            variant="primary"
            leftIcon={<ChefHat size={18} />}
            onClick={() => navigate('/')}
          >
            Discover Recipes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Your Favorite Recipes
        </h1>
        <p className="text-gray-600">
          Here are the recipes you've saved for quick access.
        </p>
      </div>
      
      <RecipeList
        recipes={favoriteRecipes}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
};

export default Favorites;