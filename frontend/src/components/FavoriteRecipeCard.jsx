import { Link } from 'react-router-dom';

const FavoriteRecipeCard = ({ recipe, onDelete }) => {
  // Fungsi untuk menangani klik tombol hapus
  const handleDeleteClick = (e) => {
    // Mencegah navigasi saat tombol hapus diklik
    e.preventDefault();
    e.stopPropagation();
    onDelete(recipe.id);
  };

  return (
    <Link to={`/recipes/${recipe.id}`} className="block transform hover:-translate-y-1 transition-transform duration-300">
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.recipeName} 
          className="w-full h-48 object-cover" 
        />
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold mb-2">{recipe.recipeName}</h3>
          <p className="text-gray-600 text-sm mb-4 flex-grow truncate">{recipe.description}</p>
          <button
            onClick={handleDeleteClick}
            className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-red-700 transition duration-300"
          >
            Hapus dari Favorit
          </button>
        </div>
      </div>
    </Link>
  );
};

export default FavoriteRecipeCard;