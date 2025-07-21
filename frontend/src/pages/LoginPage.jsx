import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { loginAction } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/auth/login', { email, password });
            if (response.data.token) {
                loginAction(response.data.token);
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login gagal. Periksa kembali email dan password Anda.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-6 sm:mt-10 px-4 sm:px-0">
            <div className="bg-white p-6 sm:p-8 border border-gray-200 rounded-lg shadow-lg">
                <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm sm:text-base text-gray-700 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 sm:p-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm sm:text-base text-gray-700 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 sm:p-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs sm:text-sm text-center mb-4">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-3 sm:py-2 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-base text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-purple-400"
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>

                <p className="mt-4 text-center">
                    <Link to="/forgot-password" className="text-sm sm:text-base text-purple-600 hover:underline">
                        Lupa Password?
                    </Link>
                </p>

                <p className="mt-6 text-center text-xs sm:text-sm">
                    Belum punya akun?{' '}
                    <Link to="/register" className="text-purple-600 hover:underline">
                        Daftar di sini
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;