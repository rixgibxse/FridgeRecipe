import axios from 'axios';

// Buat instance axios dengan konfigurasi dasar
const api = axios.create({
  // URL dasar dari backend API kita
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://fridgerecipe-backend-98947593844.asia-southeast2.run.app",
});

// Buat "interceptor" untuk permintaan
// Ini adalah fungsi yang akan berjalan SEBELUM setiap permintaan dikirim
api.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage
    const token = localStorage.getItem('token');

    // Jika token ada, tambahkan ke header Authorization
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Kembalikan konfigurasi yang sudah diubah
    return config;
  },
  (error) => {
    // Lakukan sesuatu jika terjadi error konfigurasi
    return Promise.reject(error);
  }
);

export default api;