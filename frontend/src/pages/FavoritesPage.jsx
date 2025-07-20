import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await api.get('/favorites');
        setFavorites(response.data);
      } catch (err) {
        setError('Gagal memuat resep favorit.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const confirmDelete = (recipeId) => {
    setSelectedRecipeId(recipeId);
    setShowConfirmModal(true);
  };

  const deleteRecipe = async () => {
    try {
      await api.delete(`/favorites/${selectedRecipeId}`);
      setFavorites(prev => prev.filter(fav => fav.id !== selectedRecipeId));
      setShowConfirmModal(false);
    } catch (err) {
      alert('Gagal menghapus favorit.');
      console.error(err);
      setShowConfirmModal(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-10">
        Resep Favorit Anda
      </h1>

      {loading ? (
        <p className="text-center text-gray-600 text-lg">Memuat favorit Anda...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-lg">{error}</p>
      ) : favorites.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-gray-500 text-lg mb-4">Anda belum memiliki resep favorit.</p>
          <Link
            to="/"
            className="inline-block px-6 py-2 bg-purple-600 text-white rounded-full shadow hover:bg-purple-700 transition"
          >
            Cari resep sekarang
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((recipe) => (
            <FavoriteRecipeCard
              key={recipe.id}
              recipe={recipe}
              onDelete={confirmDelete} 
            />
          ))}
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md text-center border border-purple-200">
            <h2 className="text-xl font-semibold text-purple-700 mb-4">Konfirmasi Hapus</h2>
            <p className="text-gray-700 mb-6">Apakah Anda yakin ingin menghapus resep ini dari favorit Anda?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
              >
                Batal
              </button>
              <button
                onClick={deleteRecipe}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-purple-700 transition"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
