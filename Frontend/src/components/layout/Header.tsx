import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';
import Button from '../ui/Button';
import { ChefHat, Heart, LogIn, LogOut, Menu, User, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  // Check if path matches the current route
  const isActive = (path: string) => location.pathname === path;

  // Handle scroll event for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4',
        isScrolled || isMobileMenuOpen ? 'bg-white shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold text-gray-900">FridgeRecipe</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            
            {isAuthenticated && (
              <Link
                to="/favorites"
                className={cn(
                  'nav-link',
                  isActive('/favorites') && 'nav-link-active'
                )}
              >
                Favorites
              </Link>
            )}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-600">
                  Hello, {user?.name}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  leftIcon={<LogOut size={18} />}
                >
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<LogIn size={18} />}
                  >
                    Sign in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<User size={18} />}
                  >
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-gray-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="nav-link">
                Home
              </Link>
              
              {isAuthenticated && (
                <Link to="/favorites" className="nav-link flex items-center">
                  <Heart className="mr-2 h-4 w-4" /> Favorites
                </Link>
              )}

              {isAuthenticated ? (
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-sm text-gray-600 mb-2">
                    Signed in as {user?.name}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    leftIcon={<LogOut size={18} />}
                    className="w-full justify-center"
                  >
                    Sign out
                  </Button>
                </div>
              ) : (
                <div className="pt-2 border-t border-gray-100 space-y-2">
                  <Link to="/login">
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<LogIn size={18} />}
                      className="w-full justify-center"
                    >
                      Sign in
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      variant="primary"
                      size="sm"
                      leftIcon={<User size={18} />}
                      className="w-full justify-center"
                    >
                      Sign up
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;