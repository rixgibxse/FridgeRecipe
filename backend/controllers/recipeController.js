const { db, Recipe } = require('../models');
const { model } = require('../config/geminiConfig');

const {
  generateImage,
  uploadImageFromBuffer,
  deleteImageFromGCS,
} = require('../config/imageService');

const generateRecipe = async (req, res) => {
  try {
    const { ingredients } = req.body;
    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({ error: 'Bahan-bahan tidak boleh kosong.' });
    }

    const ingredientsString = ingredients.join(', ');

    const prompt = `
      Kamu adalah koki ahli yang hanya membalas dalam format JSON murni.
      Berdasarkan bahan berikut: "${ingredientsString}", dan item umum (air, garam, gula, minyak goreng) jangan ada tambahan bahan selain dari item umum yang disebutkan, buat satu resep sederhana.

      Buatlah langkah-langkah instruksi dengan detail dan jelas agar mudah untuk diikuti.

      Jawabanmu HARUS berupa satu objek JSON tunggal.
      Struktur JSON HARUS seperti ini:
      {
        "recipeName": "Nama resepnya",
        "description": "Deskripsi singkat dan menarik tentang masakan ini",
        "ingredients": [ { "name": "Bahan 1", "quantity": "takaran" } ],
        "instructions": [
          "Langkah pertama yang detail",
          "Langkah kedua yang detail",
          "dan seterusnya..."
        ],
        "imagePrompt": "Prompt deskriptif untuk AI gambar, dalam gaya fotografi makanan profesional. Deskripsi singkat dalam bahasa Inggris untuk menghasilkan gambar masakan ini, contoh: 'A professionally photographed dish of [recipeName], beautifully plated with fresh garnishes, vibrant colors, soft natural lighting, shallow depth of field, high detail, styled like gourmet food magazine photography.'"
      }
    `;

    const result = await model.generateContent(prompt);
    let text = result.response.text();
    const jsonMatch = text.match(/{[\s\S]*}/);
    if (jsonMatch && jsonMatch[0]) {
      text = jsonMatch[0];
    }
    const recipeJson = JSON.parse(text);
    const imageBuffer = await generateImage(recipeJson.imagePrompt);
    const responseData = {
      ...recipeJson,
      imageData: imageBuffer.toString('base64'),
    };
    delete responseData.imagePrompt;
    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error di generateRecipe:', error);
    res.status(500).json({ error: 'Gagal menghasilkan resep.' });
  }
};

const addFavorite = async (req, res) => {
  const userId = req.user.id;
  const {
    recipeName,
    description,
    ingredients,
    instructions,
    imageData,
  } = req.body;
  if (!imageData) {
    return res.status(400).json({ error: 'Data gambar tidak ditemukan.' });
  }
  const t = await db.transaction();
  try {
    const imageBuffer = Buffer.from(imageData, 'base64');
    const imageUrl = await uploadImageFromBuffer(imageBuffer);
    const [recipe, created] = await Recipe.findOrCreate({
      where: { recipeName: recipeName },
      defaults: {
        recipeName,
        description,
        ingredients,
        instructions,
        imageUrl,
      },
      transaction: t,
    });
    await req.user.addRecipe(recipe, { transaction: t });
    await t.commit();
    res.status(201).json({
      message: 'Resep berhasil ditambahkan ke favorit.',
      recipe: recipe,
    });
  } catch (error) {
    await t.rollback();
    console.error('Gagal menambahkan favorit:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat menyimpan favorit.' });
  }
};

const getFavorites = async (req, res) => {
  try {
    const favoriteRecipes = await req.user.getRecipes({
      joinTableAttributes: [],
    });
    res.status(200).json(favoriteRecipes);
  } catch (error) {
    console.error('Gagal mengambil favorit:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data favorit.' });
  }
};

const removeFavorite = async (req, res) => {
  const t = await db.transaction();
  try {
    const { recipeId } = req.params;
    const user = req.user;
    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: 'Resep tidak ditemukan.' });
    }
    const result = await user.removeRecipe(recipe, { transaction: t });
    if (result === 0) {
      await t.rollback();
      return res.status(404).json({ error: 'Resep tidak ada di daftar favorit Anda.' });
    }
    const favoriteCount = await recipe.countUsers({ transaction: t });
    if (favoriteCount === 0) {
      await deleteImageFromGCS(recipe.imageUrl);
      await recipe.destroy({ transaction: t });
    }
    await t.commit();
    res.status(200).json({ message: 'Resep berhasil dihapus dari favorit.' });
  } catch (error) {
    await t.rollback();
    console.error('Gagal menghapus favorit:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat menghapus favorit.' });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.recipeId);

    if (!recipe) {
      return res.status(404).json({ error: 'Resep tidak ditemukan.' });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error('Gagal mengambil detail resep:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data resep.' });
  }
};

module.exports = {
  generateRecipe,
  addFavorite,
  getFavorites,
  removeFavorite,
  getRecipeById,
};