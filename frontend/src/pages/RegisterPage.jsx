@@ .. @@
     };
 
     return (
-        <div className="max-w-md mx-auto mt-10">
-            <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
-                <h2 className="text-2xl font-bold text-center mb-6">Buat Akun Baru</h2>
+        <div className="max-w-md mx-auto mt-6 sm:mt-10 px-4 sm:px-0">
+            <div className="bg-white p-6 sm:p-8 border border-gray-200 rounded-lg shadow-lg">
+                <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">Buat Akun Baru</h2>
                 <form onSubmit={handleRegister}>
                     <div className="mb-4">
-                        <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
+                        <label htmlFor="username" className="block text-sm sm:text-base text-gray-700 font-medium mb-2">Username</label>
                         <input
                             type="text"
                             id="username"
                             value={username}
                             onChange={(e) => setUsername(e.target.value)}
                             required
-                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
+                            className="w-full p-3 sm:p-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                         />
                     </div>
                     <div className="mb-4">
-                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
+                        <label htmlFor="email" className="block text-sm sm:text-base text-gray-700 font-medium mb-2">Email</label>
                         <input
                             type="email"
                             id="email"
                             value={email}
                             onChange={(e) => setEmail(e.target.value)}
                             required
-                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
+                            className="w-full p-3 sm:p-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                         />
                     </div>
                     <div className="mb-4">
-                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
+                        <label htmlFor="password" className="block text-sm sm:text-base text-gray-700 font-medium mb-2">Password</label>
                         <input
                             type="password"
                             id="password"
                             value={password}
                             onChange={(e) => setPassword(e.target.value)}
                             required
-                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
+                            className="w-full p-3 sm:p-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                         />
                     </div>
                     {/* Input baru untuk konfirmasi password */}
                     <div className="mb-6">
-                        <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Konfirmasi Password</label>
+                        <label htmlFor="confirmPassword" className="block text-sm sm:text-base text-gray-700 font-medium mb-2">Konfirmasi Password</label>
                         <input
                             type="password"
                             id="confirmPassword"
                             value={confirmPassword}
                             onChange={(e) => setConfirmPassword(e.target.value)}
                             required
-                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
+                            className="w-full p-3 sm:p-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                         />
                     </div>
 
-                    {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
+                    {error && <p className="text-red-500 text-xs sm:text-sm text-center mb-4">{error}</p>}
                     <button
                         type="submit"
                         disabled={loading}
-                        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 disabled:bg-gray-400 transition duration-300"
+                        className="w-full bg-purple-600 text-white py-3 sm:py-2 text-sm sm:text-base rounded-md hover:bg-purple-700 disabled:bg-gray-400 transition duration-300"
                     >
                         {loading ? 'Mendaftarkan...' : 'Register'}
                     </button>
                 </form>
 
-                <p className="mt-6 text-center text-sm">
+                <p className="mt-6 text-center text-xs sm:text-sm">
                     Sudah punya akun?{' '}
                     <Link to="/login" className="text-purple-600 hover:underline">
                         Login di sini
                     </Link>
                 </p>
             </div>
         </div>
     );
 };
 
 export default RegisterPage;