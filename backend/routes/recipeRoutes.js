const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware');

// Route untuk membuat resep
router.post('/generate-recipe', protect, recipeController.generateRecipe);

// Mendapatkan semua resep favorit untuk pengguna yang diautentikasi
router.get('/favorites', protect, recipeController.getFavoriteRecipes);

// Mendapatkan detail resep favorit berdasarkan ID
router.get('/favorites/:id', protect, recipeController.getFavoriteRecipeById);

// Menyimpan resep ke favorit
router.post('/favorites', protect, recipeController.addFavoriteRecipe);

// Menghapus resep favorit
router.delete('/favorites/:id', protect, recipeController.deleteFavoriteRecipe);

// Mendapatkan detail resep umum berdasarkan ID
router.get('/recipes/:id', recipeController.getRecipeById);

module.exports = router;