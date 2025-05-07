import React from "react";
import { Link } from "react-router-dom";
import { ChefHat, Github, Linkedin } from "lucide-react";
import { Heart } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <ChefHat className="h-6 w-6 text-purple-600" />
              <span className="text-lg font-bold text-gray-900">
                FridgeRecipe
              </span>
            </Link>
            <p className="mt-2 text-sm text-gray-600">
              Find delicious recipes with the ingredients you already have in
              your fridge.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-purple-600">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-600">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

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
                <Link
                  to="/favorites"
                  className="text-gray-600 hover:text-purple-600"
                >
                  Favorites
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="#" className="text-gray-600 hover:text-purple-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-purple-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-purple-600">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

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
                  info@fridgerecipe.com
                </a>
              </li>
              <li className="text-gray-600">
                123 Recipe Street
                <br />
                Food City, FC 12345
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600 text-sm">
                &copy; {new Date().getFullYear()} FridgeRecipe. All rights
                reserved.
              </p>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <span>Made with</span>
              <Heart size={16} className="text-red-500" fill="currentColor" />
              <span>for great cooking</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
