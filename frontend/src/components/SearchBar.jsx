import { useState, useRef, useEffect } from 'react';

const SearchBar = ({ onSearch, loading }) => {
  const [ingredients, setIngredients] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ingredients.trim()) {
      alert('Silakan masukkan bahan-bahan terlebih dahulu.');
      return;
    }
    onSearch(ingredients.split(',').map(item => item.trim()));
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [ingredients]);

  return (
    <div className="my-6 sm:my-8 px-4">
      <form
        onSubmit={handleSubmit}
        className="relative max-w-2xl mx-auto my-6 sm:my-8"
      >
        <div className="flex flex-col sm:flex-row items-start shadow-md border border-gray-300 overflow-hidden rounded-2xl sm:rounded-[40px] px-3 sm:px-4 py-2 bg-white">
          <textarea
            ref={textareaRef}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Contoh: ayam, bawang, nasi"
            disabled={loading}
            rows={1}
            className="flex-grow text-sm sm:text-base px-2 sm:px-4 py-2 focus:outline-none resize-none bg-transparent w-full"
          />
          <button
            type="submit"
            disabled={loading}
            className="
              bg-purple-600 text-white font-semibold
              px-4 sm:px-6 py-2 mt-2 sm:mt-0 sm:ml-2
              rounded-lg sm:rounded-full
              hover:bg-purple-700 transition
              disabled:bg-gray-400 disabled:cursor-not-allowed
              w-full sm:w-auto text-sm sm:text-base
            "
          >
            {loading ? '...' : 'Cari'}
          </button>
        </div>
        <p className="text-center text-xs sm:text-sm text-gray-500 mt-2 px-2">
          Masukkan bahan-bahan yang Anda miliki, pisahkan dengan koma.
        </p>
      </form>
    </div>
  );
};

export default SearchBar;