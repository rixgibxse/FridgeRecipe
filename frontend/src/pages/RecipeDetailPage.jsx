<button onclick="window.location.href='/login'" class="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition">
Login
</button>
</div>
</div>
`;
document.body.appendChild(loginModal);
setTimeout(() => loginModal.remove(), 10000); // Auto remove after 10 seconds
@@ .. @@
}

return (
-    <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-5xl mx-auto mt-10 border border-purple-200">
+    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-2xl max-w-5xl mx-auto mt-6 sm:mt-10 border border-purple-200 mx-4 sm:mx-auto">
setShowSuccessModal(true);
// Auto redirect after 2 seconds
setTimeout(() => {
navigate('/favorites');
}, 2000);
+      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-700 mb-4 sm:mb-6 text-center">{recipe.recipeName}</h2>
// Buat modal untuk error
const errorModal = document.createElement('div');
errorModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4';
errorModal.innerHTML = `
<div class="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md text-center border border-red-200">
<div class="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
<svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
</svg>
</div>
<h2 class="text-xl font-semibold text-red-700 mb-4">Gagal Menyimpan</h2>
<p class="text-gray-700 mb-6">Terjadi kesalahan saat menyimpan resep. Silakan coba lagi.</p>
<button onclick="this.closest('.fixed').remove()" class="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition">
Tutup
</button>
</div>
`;
document.body.appendChild(errorModal);
setTimeout(() => errorModal.remove(), 5000); // Auto remove after 5 seconds
-      <div className="flex flex-col md:flex-row gap-10">
+      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10">
{/* Kolom Gambar */}
-        <div className="md:w-1/2">
+        <div className="lg:w-1/2">
<img
src={\`data:image/png;base64,${recipe.imageData}`}
alt={recipe.recipeName}
-            className="w-full h-auto rounded-xl shadow-lg object-cover"
+            className="w-full h-64 sm:h-80 lg:h-auto rounded-xl shadow-lg object-cover"
/>
</div>

<>
<div className="bg-white p-4 sm:p-6 rounded-2xl shadow-2xl max-w-5xl mx-auto mt-6 sm:mt-10 border border-purple-200 mx-4 sm:mx-auto">
{/* Judul */}
<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-700 mb-4 sm:mb-6 text-center">{recipe.recipeName}</h2>

<div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10">
{/* Kolom Gambar */}
<div className="lg:w-1/2">
<img
src={\`data:image/png;base64,${recipe.imageData}`}
alt={recipe.recipeName}
className="w-full h-64 sm:h-80 lg:h-auto rounded-xl shadow-lg object-cover"
/>
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

{token && (
<button 
  onClick={handleSaveFavorite} 
  disabled={isSaving}
  className="mt-6 sm:mt-8 w-full bg-purple-700 text-white py-3 text-sm sm:text-base rounded-xl hover:bg-purple-800 disabled:bg-gray-400 transition duration-300"
>
  {isSaving ? 'Menyimpan...' : 'Simpan ke Favorit'}
</button>
)}
</div>
</div>
</div>
<h2 class="text-xl font-semibold text-purple-700 mb-4">Login Diperlukan</h2>
</div>

{/* Success Modal */}
{showSuccessModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
<div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md text-center border border-purple-200 transform animate-pulse">
<div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
<svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
</svg>
</div>
<h2 className="text-xl font-semibold text-green-700 mb-4">Berhasil Disimpan!</h2>
<p className="text-gray-700 mb-6">Resep telah berhasil ditambahkan ke favorit Anda.</p>
<div className="flex justify-center">
<div className="w-8 h-1 bg-purple-600 rounded-full animate-pulse"></div>
</div>
<p className="text-sm text-gray-500 mt-2">Mengalihkan ke halaman favorit...</p>
</div>
</div>
)}
</>
);
<div class="flex justify-center gap-4">
const [showSuccessModal, setShowSuccessModal] = useState(false);
<button onclick="this.closest('.fixed').remove()" class="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 transition">
};
Batal

</button>
export default RecipeDetailPage;