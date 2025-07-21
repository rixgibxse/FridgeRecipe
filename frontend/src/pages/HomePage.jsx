@@ .. @@
 const HomePage = () => {
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState('');
     const navigate = useNavigate();
 
     // Fungsi yang dipanggil saat search bar di-submit
     const handleSearch = async (ingredients) => {
         setLoading(true);
         setError('');
 
         try {
             const response = await api.post('/generate-recipe', { ingredients });
             navigate('/recipe-detail', { state: { recipe: response.data } });
 
         } catch (err) {
             setError('Gagal mencari resep. Silakan coba lagi.');
             console.error(err);
         } finally {
             setLoading(false);
         }
     };
 
     return (
         <>
-            <div className="text-center px-4 mt-10">
+            <div className="text-center px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10">
-                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
+                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                     What&apos;s in your <span className="text-purple-700">fridge</span>?
                 </h1>
 
-                <p className="text-xl text-gray-600 max-w-4xl mx-auto">
+                <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto px-2">
                     Add the ingredients you have at home, and we&apos;ll show you recipes you
                     can make right now. <br />
                     No more wondering what to cook!
                 </p>
 
                 <SearchBar onSearch={handleSearch} loading={loading} />
 
-                {loading && <p className="mt-4 text-blue-600">Mencari resep terbaik untuk Anda...</p>}
-                {error && <p className="mt-4 text-red-500">{error}</p>}
+                {loading && <p className="mt-4 text-sm sm:text-base text-blue-600 px-4">Mencari resep terbaik untuk Anda...</p>}
+                {error && <p className="mt-4 text-sm sm:text-base text-red-500 px-4">{error}</p>}
             </div>
 
             {/* Bagian "Cara Kerja" Anda tetap di sini */}
-            <div className="py-12 bg-purple-50 rounded-xl mt-16">
-                <div className="max-w-5xl mx-auto px-4">
-                    <div className="text-center mb-10">
-                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
+            <div className="py-8 sm:py-12 bg-purple-50 rounded-xl mt-8 sm:mt-16 mx-4 sm:mx-0">
+                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
+                    <div className="text-center mb-6 sm:mb-10">
+                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                             Cara Kerja
                         </h2>
-                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
+                        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
                             Temukan resep yang disesuaikan dengan bahan dan preferensimu
                         </p>
                     </div>
 
-                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
+                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                         {[
                             { num: 1, title: "Cari Resep", desc: "Temukan resep sesuai bahan yang kamu punya" },
                             { num: 2, title: "Simpan Favorit", desc: "Simpan resep favorit untuk akses cepat" },
                             { num: 3, title: "Mulai Memasak", desc: "Ikuti langkah memasaknya dan nikmati" }
                         ].map((step) => (
-                            <div key={step.num} className="text-center">
-                                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
-                                    <span className="text-2xl font-bold text-purple-600">{step.num}</span>
+                            <div key={step.num} className="text-center px-4 sm:px-0">
+                                <div className="bg-white w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
+                                    <span className="text-xl sm:text-2xl font-bold text-purple-600">{step.num}</span>
                                 </div>
-                                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
-                                <p className="text-gray-600">{step.desc}</p>
+                                <h3 className="text-lg sm:text-xl font-semibold mb-2">{step.title}</h3>
+                                <p className="text-sm sm:text-base text-gray-600">{step.desc}</p>
                             </div>
                         ))}
                     </div>
                 </div>
             </div>
         </>
     );
 };
 
 export default HomePage;