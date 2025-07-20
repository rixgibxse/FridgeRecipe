import { createContext, useContext, useEffect, useState } from 'react';

// 1. Buat Context
const AuthContext = createContext();

// 2. Buat Provider Component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null); // Kita akan isi ini nanti

  // Efek untuk memeriksa token saat aplikasi pertama kali dimuat
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      // Nanti di sini kita bisa fetch data user berdasarkan token
    }
  }, []);

  // Fungsi untuk menyimpan token setelah login
  const loginAction = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  // Fungsi untuk logout
  const logoutAction = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const value = {
    token,
    user,
    loginAction,
    logoutAction,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Buat custom hook untuk menggunakan context ini dengan mudah
export const useAuth = () => {
  return useContext(AuthContext);
};