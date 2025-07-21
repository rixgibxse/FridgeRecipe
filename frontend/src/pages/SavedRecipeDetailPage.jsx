import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const SavedRecipeDetailPage = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await api.get(`/favorites/${recipeId}`);
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

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await api.delete(`/favorites/${recipeId}`);
      // Show success message
      const successModal = document.createElement('div');
      successModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4';
      successModal.innerHTML = `
        <div class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md text-center border border-green-200">
          <div class="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-green-700 mb-4">Berhasil Dihapus!</h2>
          <p class="text-gray-700 mb-6">Resep telah dihapus dari favorit Anda.</p>
          <div class="flex justify-center">
            <div class="w-8 h-1 bg-purple-600 rounded-full animate-pulse"></div>
          </div>
          <p class="text-sm text-gray-500 mt-2">Mengalihkan ke halaman favorit...</p>
        </div>
      `;
      document.body.appendChild(successModal);

      setTimeout(() => {
        navigate('/favorites');
      }, 2000);
    } catch (err) {
      // Show error message
      const errorModal = document.createElement('div');
      errorModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4';
      errorModal.innerHTML = `
        <div class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md text-center border border-red-200">
          <div class="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-red-700 mb-4">Gagal Menghapus</h2>
          <p class="text-gray-700 mb-6">Terjadi kesalahan saat menghapus resep. Silakan coba lagi.</p>
          <button onclick="this.closest('.fixed').remove()" class="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition">
            Tutup
          </button>
        </div>
      `;
      document.body.appendChild(errorModal);
      setTimeout(() => errorModal.remove(), 5000);
      console.error(err);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) return <div className="text-center mt-10">Memuat resep...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!recipe) return <div className="text-center mt-10">Resep tidak ditemukan.</div>;

  return (
    <>
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-2xl max-w-5xl mx-auto mt-6 sm:mt-10 border border-purple-200 mx-4 sm:mx-auto">
        {/* Tombol Kembali */}
        <div className="mb-4">
          <Link
            to="/favorites"
            className="inline-block text-black px-3 sm:px-4 py-2 text-sm sm:text-base rounded-full hover:text-purple-700 transition"
          >
            ← Kembali
          </Link>
        </div>

        {/* Judul */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-700 mb-4 sm:mb-6 text-center">{recipe.recipeName}</h2>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10">
          {/* Kolom Gambar */}
          <div className="lg:w-1/2">
            <div className="relative">
              <img
                src={recipe.imageUrl}
                alt={recipe.recipeName}
                className="w-full h-64 sm:h-80 lg:h-auto rounded-xl shadow-lg object-cover"
              />
              {/* Delete Button */}
              <button
                onClick={handleDeleteClick}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-700 transition duration-300 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                Hapus dari Favorit
              </button>
            </div>
          </div>

          {/* Kolom Detail */}
          <div className="lg:w-1/2">
            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed">{recipe.description}</p>

            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-purple-700 mb-3">Bahan-bahan:</h3>
            <ul className="list-disc list-inside mb-4 sm:mb-6 space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-800">
              {recipe.ingredients.map((item, index) => (
                <li key={index}>
                  <span className="font-medium">{item.name}</span> ({item.quantity})
                </li>
              ))}
            </ul>

            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-purple-700 mb-3">Instruksi:</h3>
            <ol className="list-decimal list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-800">
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md text-center border border-red-200">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-red-700 mb-4">Konfirmasi Hapus</h2>
            <p className="text-gray-700 mb-6">Apakah Anda yakin ingin menghapus resep "{recipe.recipeName}" dari favorit Anda?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 transition disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50 flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Menghapus...
                  </>
                ) : (
                  'Hapus'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SavedRecipeDetailPage;