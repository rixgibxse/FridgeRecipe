import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import FavoritesPage from './pages/FavoritesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import SavedRecipeDetailPage from './pages/SavedRecipeDetailPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import CookiePolicyPage from './pages/CookiePolicyPage';

import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/recipe-detail" element={<RecipeDetailPage />} />
        <Route path="/recipes/:recipeId" element={<SavedRecipeDetailPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/cookie-policy" element={<CookiePolicyPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;