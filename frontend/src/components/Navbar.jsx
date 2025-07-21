import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ChefHat, LogIn, UserPlus, Heart, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const { token, logoutAction } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logoutAction();
        navigate('/login');
        setIsMenuOpen(false);
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-3 sm:py-4">
                    <Link
                        to={token ? "/" : "/"}
                        className="flex items-center space-x-2 text-purple-600"
                    >
                        <ChefHat className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                        <span className="text-lg sm:text-xl font-bold text-gray-900">FridgeRecipe</span>
                    </Link>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        {token ? (
                            <>
                                <Link to="/favorites" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition text-sm lg:text-base">
                                    <Heart size={16} className="sm:w-4 sm:h-4" /> Favorit
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 bg-purple-600 text-white py-2 px-3 lg:px-4 rounded-lg hover:bg-purple-700 transition text-sm lg:text-base"
                                >
                                    <LogOut size={16} className="sm:w-4 sm:h-4" /> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition text-sm lg:text-base">
                                    <LogIn size={16} className="sm:w-4 sm:h-4" /> Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="flex items-center gap-2 bg-purple-600 text-white py-2 px-3 lg:px-4 rounded-lg hover:bg-purple-700 transition text-sm lg:text-base"
                                >
                                    <UserPlus size={16} className="sm:w-4 sm:h-4" /> Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-600 hover:text-purple-600 transition"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 py-4">
                        <div className="flex flex-col space-y-3">
                            {token ? (
                                <>
                                    <Link 
                                        to="/favorites" 
                                        className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition px-2 py-2"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <Heart size={18} /> Favorit
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition w-full justify-center"
                                    >
                                        <LogOut size={18} /> Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link 
                                        to="/login" 
                                        className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition px-2 py-2"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <LogIn size={18} /> Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="flex items-center gap-2 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition w-full justify-center"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <UserPlus size={18} /> Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;