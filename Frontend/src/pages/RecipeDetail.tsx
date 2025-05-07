import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Heart, Clock, Users, ChevronLeft, CheckCircle2 } from 'lucide-react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import { cn } from '../utils/cn';

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRecipeById, favorites, toggleFavorite } = useRecipes();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions'>('ingredients');
  
  const recipe = id ? getRecipeById(id) : null;
  const isFavorite = id ? favorites.includes(id) : false;
  
  useEffect(() => {
    if (!recipe) {
      navigate('/');
    }
  }, [recipe, navigate]);
  
  if (!recipe) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-800">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to recipes
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recipe Image & Info */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative">
                <img 
                  src={recipe.image} 
                  alt={recipe.title}
                  className="w-full h-64 object-cover"
                />
                
                {recipe.matchPercentage && (
                  <div className="absolute top-0 left-0 m-4">
                    <Badge color="success" size="lg">
                      {recipe.matchPercentage}% Match
                    </Badge>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{recipe.cookingTime} mins</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{recipe.servings} servings</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {recipe.tags.map((tag, index) => (
                    <Badge key={index} color="primary" variant="subtle">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {isAuthenticated && (
                  <Button
                    variant={isFavorite ? 'outline' : 'primary'}
                    className="w-full"
                    leftIcon={<Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />}
                    onClick={() => toggleFavorite(recipe.id)}
                  >
                    {isFavorite ? 'Saved to Favorites' : 'Save to Favorites'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Recipe Content */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{recipe.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{recipe.description}</p>
          
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('ingredients')}
                className={cn(
                  "py-2 px-1 border-b-2 font-medium text-sm",
                  activeTab === 'ingredients'
                    ? "border-purple-600 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                Ingredients
              </button>
              <button
                onClick={() => setActiveTab('instructions')}
                className={cn(
                  "py-2 px-1 border-b-2 font-medium text-sm",
                  activeTab === 'instructions'
                    ? "border-purple-600 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                Instructions
              </button>
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="pb-12">
            {activeTab === 'ingredients' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Ingredients</h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start py-2 border-b border-gray-100">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeTab === 'instructions' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Instructions</h2>
                <ol className="space-y-6">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <div className="bg-purple-100 text-purple-600 w-8 h-8 rounded-full flex items-center justify-center font-medium">
                          {index + 1}
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-800">{instruction}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;