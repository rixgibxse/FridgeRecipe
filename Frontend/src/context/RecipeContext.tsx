import React, { createContext, useState, useContext, useEffect } from 'react';
import { Recipe } from '../types';
import { mockRecipes } from '../data/mockData';

interface RecipeContextType {
  recipes: Recipe[];
  favoriteRecipes: Recipe[];
  favorites: string[];
  isLoading: boolean;
  searchRecipes: (query: string) => void;
  toggleFavorite: (recipeId: string) => void;
  getRecipeById: (id: string) => Recipe | undefined;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }

    // TODO: Integrate with Gemini API for initial recipe recommendations
    // const fetchRecommendations = async () => {
    //   try {
    //     const response = await fetch('/api/recommendations', {
    //       headers: {
    //         'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`
    //       }
    //     });
    //     const data = await response.json();
    //     setRecipes(data);
    //   } catch (error) {
    //     console.error('Error fetching recommendations:', error);
    //   }
    // };
    
    // fetchRecommendations();
  }, []);

  // Save favorites to localStorage when updated
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const searchRecipes = async (query: string) => {
    setIsLoading(true);
    
    try {
      // TODO: Integrate with Gemini API for search
      // const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
      //   headers: {
      //     'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`
      //   }
      // });
      // const data = await response.json();
      // setRecipes(data);

      // Temporary mock search implementation
      setTimeout(() => {
        const filtered = mockRecipes.filter(recipe => 
          recipe.title.toLowerCase().includes(query.toLowerCase()) ||
          recipe.description.toLowerCase().includes(query.toLowerCase()) ||
          recipe.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
        setRecipes(filtered);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error searching recipes:', error);
      setIsLoading(false);
    }
  };

  const toggleFavorite = (recipeId: string) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(recipeId)) {
        return prevFavorites.filter(id => id !== recipeId);
      } else {
        return [...prevFavorites, recipeId];
      }
    });
    
    // TODO: Integrate with backend API
    // await api.post('/user/favorites/toggle', { recipeId });
  };
  
  const getRecipeById = (id: string) => {
    return mockRecipes.find(recipe => recipe.id === id);
  };
  
  const favoriteRecipes = mockRecipes.filter(recipe => favorites.includes(recipe.id));

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        favoriteRecipes,
        favorites,
        isLoading,
        searchRecipes,
        toggleFavorite,
        getRecipeById
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};