import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const ResetPasswordPage = () => {
  const { token } = useParams(); // Mengambil token dari URL
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(`/auth/reset-password/${token}`, { password });
      setMessage(response.data.message + ' Anda akan dialihkan ke halaman login.');

      // Tunggu 3 detik sebelum mengalihkan ke halaman login
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (err) {
      setError(err.response?.data?.error || 'Token tidak valid atau sudah kedaluwarsa.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Atur Password Baru</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password"  className="block text-gray-700 font-medium mb-2">Password Baru</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required

              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword"  className="block text-gray-700 font-medium mb-2">Konfirmasi Password Baru</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {message && <p className="text-green-600 text-sm text-center mb-4">{message}</p>}
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading || message} // Disable tombol jika sedang loading atau sudah ada pesan sukses
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 disabled:bg-gray-400 transition duration-300"
          >
            {loading ? 'Menyimpan...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;