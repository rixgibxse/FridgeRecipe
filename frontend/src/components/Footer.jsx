import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Github, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left items-center md:items-start">
          {/* Bagian Logo dan Deskripsi (sudah benar) */}
          <div className="md:col-span-1">
            <Link to="/" className="flex justify-center md:justify-start items-center space-x-2">
              <ChefHat className="h-6 w-6 text-purple-600" />
              <span className="text-lg font-bold text-gray-900">FridgeRecipe</span>
            </Link>
            <p className="mt-2 text-sm text-gray-600 max-w-xs mx-auto md:mx-0">
              Find delicious recipes with the ingredients you already have in your fridge.
            </p>
            <div className="mt-4 flex justify-center md:justify-start space-x-4">
              <a href="https://github.com/fadjriarii" className="text-gray-500 hover:text-purple-600">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/auliafadjri/" className="text-gray-500 hover:text-purple-600">
                <Linkedin size={20} />
              </a>
              <a href="https://www.instagram.com/fadjriarii" className="text-gray-500 hover:text-purple-600">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Bagian Navigasi (sudah benar) */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-purple-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-gray-600 hover:text-purple-600">
                  Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* Bagian Legal (diperbarui) */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-gray-600 hover:text-purple-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-600 hover:text-purple-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-gray-600 hover:text-purple-600">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Bagian Kontak (sudah benar) */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Contact
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="mailto:info@fridgerecipe.com"
                  className="text-gray-600 hover:text-purple-600"
                >
                  19210999@bsi.ac.id
                </a>
              </li>
              <li className="text-gray-600">
                Jl. RS. Fatmawati Raya No.24, RT.7/RW.1, Pd. Labu, Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12450
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            © {new Date().getFullYear()} FridgeRecipe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;