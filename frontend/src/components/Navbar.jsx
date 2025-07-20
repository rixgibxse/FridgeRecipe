import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ChefHat, LogIn, UserPlus, Heart, LogOut } from 'lucide-react';

const Navbar = () => {
    const { token, logoutAction } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutAction();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link
                        to={token ? "/" : "/"}
                        className="flex items-center space-x-2 text-purple-600"
                    >
                        <ChefHat className="h-6 w-6 text-purple-600" />
                        <span className="text-xl font-bold text-gray-900">FridgeRecipe</span>
                    </Link>
                    <div className="flex items-center space-x-4">
                        {token ? (
                            <>
                                <Link to="/favorites" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition">
                                    <Heart size={18} /> Favorit
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-2 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
                                >
                                    <LogOut size={18} /> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition">
                                    <LogIn size={18} /> Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="flex items-center gap-2 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition"
                                >
                                    <UserPlus size={18} /> Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav >
    );
};

export default Navbar;