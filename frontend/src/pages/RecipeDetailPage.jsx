import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const RecipeDetailPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();
  
  const [isSaving, setIsSaving] = useState(false);
  const recipe = state?.recipe;

  useEffect(() => {
    if (!recipe) {
      navigate('/');
    }
  }, [recipe, navigate]);

  const handleSaveFavorite = async () => {
    if (!token) {
      alert('Anda harus login untuk menyimpan resep favorit.');
      navigate('/login');
      return;
    }

    setIsSaving(true);
    try {
      await api.post('/favorites', recipe);
      alert('Resep berhasil disimpan ke favorit!');
      navigate('/favorites');
    } catch (err) {
      alert('Gagal menyimpan resep.');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (!recipe) {
    return <p className="text-center mt-8 text-purple-600">Memuat resep...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-5xl mx-auto mt-10 border border-purple-200">
      {/* Judul */}
      <h2 className="text-4xl font-bold text-purple-700 mb-6 text-center">{recipe.recipeName}</h2>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Kolom Gambar */}
        <div className="md:w-1/2">
          <img
            src={`data:image/png;base64,${recipe.imageData}`}
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

          {token && (
            <button 
              onClick={handleSaveFavorite} 
              disabled={isSaving}
              className="mt-8 w-full bg-purple-700 text-white py-3 rounded-xl hover:bg-purple-800 disabled:bg-gray-400 transition duration-300"
            >
              {isSaving ? 'Menyimpan...' : 'Simpan ke Favorit'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
