import { Link } from 'react-router-dom';
import { ChefHat, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center sm:text-left items-center sm:items-start">
          {/* Bagian Logo dan Deskripsi */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex justify-center sm:justify-start items-center space-x-2">
              <ChefHat className="h-6 w-6 text-purple-600" />
              <span className="text-base sm:text-lg font-bold text-gray-900">FridgeRecipe</span>
            </Link>
            <p className="mt-2 text-xs sm:text-sm text-gray-600 max-w-xs mx-auto sm:mx-0">
              Find delicious recipes with the ingredients you already have in your fridge.
            </p>
            <div className="mt-4 flex justify-center sm:justify-start space-x-4">
              <a href="https://github.com/fadjriarii" className="text-gray-500 hover:text-purple-600">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Bagian Navigasi */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="mt-3 sm:mt-4 space-y-2">
              <li>
                <Link to="/" className="text-xs sm:text-sm text-gray-600 hover:text-purple-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-xs sm:text-sm text-gray-600 hover:text-purple-600">
                  Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* Bagian Legal */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-3 sm:mt-4 space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-xs sm:text-sm text-gray-600 hover:text-purple-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-xs sm:text-sm text-gray-600 hover:text-purple-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-xs sm:text-sm text-gray-600 hover:text-purple-600">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Bagian Kontak */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Contact
            </h3>
            <ul className="mt-3 sm:mt-4 space-y-2">
              <li>
                <a
                  href="mailto:19210999@bsi.ac.id"
                  className="text-xs sm:text-sm text-gray-600 hover:text-purple-600"
                >
                  19210999@bsi.ac.id
                </a>
              </li>
              <li className="text-xs sm:text-sm text-gray-600">
                Jl. RS. Fatmawati Raya No.24, RT.7/RW.1, Pd. Labu, Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12450
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
          <p className="text-xs sm:text-sm text-gray-600 text-center">
            © {new Date().getFullYear()} FridgeRecipe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;