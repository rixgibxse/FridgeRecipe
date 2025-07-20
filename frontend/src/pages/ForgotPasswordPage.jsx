import { useState } from 'react';
import api from '../services/api';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await api.post('/auth/forgot-password', { email });
      setMessage(response.data.message);
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Lupa Password</h2>
        <p className="text-center text-gray-600 mb-6">Masukkan email Anda, dan kami akan mengirimkan link untuk mereset password Anda.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {message && <p className="text-green-600 text-sm text-center mb-4">{message}</p>}
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 disabled:bg-gray-400 transition duration-300"
          >
            {loading ? 'Mengirim...' : 'Kirim Link Reset'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;