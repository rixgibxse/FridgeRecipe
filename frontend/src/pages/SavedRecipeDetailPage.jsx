import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

const SavedRecipeDetailPage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await api.get(`/recipes/${recipeId}`);
        setRecipe(response.data);
      } catch (err) {
        setError('Gagal memuat detail resep.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (loading) {
    return <p className="text-center mt-8 text-purple-600">Memuat detail resep...</p>;
  }

  if (error) {
    return <p className="text-center mt-8 text-red-500">{error}</p>;
  }

  if (!recipe) {
    return <p className="text-center mt-8 text-gray-500">Resep tidak ditemukan.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-5xl mx-auto mt-10 border border-purple-200">
      {/* Tombol Kembali */}
      <div className="mb-4">
        <Link
          to="/favorites"
          className="inline-block text-black px-4 py-2 rounded-full hover:text-purple-700 transition"
        >
          ← Kembali
        </Link>
      </div>

      {/* Judul */}
      <h2 className="text-4xl font-bold text-purple-700 mb-6 text-center">{recipe.recipeName}</h2>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Kolom Gambar */}
        <div className="md:w-1/2">
          <img
            src={recipe.imageUrl}
            alt={recipe.recipeName}
            className="w-full h-auto rounded-xl shadow-lg object-cover"
          />
        </div>

        {/* Kolom Detail */}
        <div className="md:w-1/2">
          <p className="text-gray-700 mb-6 leading-relaxed">{recipe.description}</p>

          <h3 className="text-2xl font-semibold text-purple-700 mb-3">Bahan-bahan:</h3>
          <ul className="list-disc list-inside mb-6 space-y-2 text-gray-800">
            {recipe.ingredients.map((item, index) => (
              <li key={index}>
                <span className="font-medium">{item.name}</span> ({item.quantity})
              </li>
            ))}
          </ul>

          <h3 className="text-2xl font-semibold text-purple-700 mb-3">Instruksi:</h3>
          <ol className="list-decimal list-inside space-y-3 text-gray-800">
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default SavedRecipeDetailPage;
