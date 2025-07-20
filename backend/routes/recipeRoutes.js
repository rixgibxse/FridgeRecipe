const express = require('express');
const router = express.Router();

const {
  generateRecipe,
  addFavorite,
  getFavorites,
  removeFavorite,
  getRecipeById,
} = require('../controllers/recipeController');

const { protect } = require('../middleware/authMiddleware');

router.post('/generate-recipe', generateRecipe);

router.route('/favorites')
  .post(protect, addFavorite)
  .get(protect, getFavorites);

router.delete('/favorites/:recipeId', protect, removeFavorite);

router.get('/recipes/:recipeId', getRecipeById);

module.exports = router;