import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  // Ambil token dari context
  const { token } = useAuth();

  // Cek apakah pengguna memiliki token (sudah login)
  // Jika iya, tampilkan halaman yang diminta melalui <Outlet />
  // Jika tidak, alihkan (redirect) ke halaman /login
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;