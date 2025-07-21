const { db, Recipe, Favorite } = require('../models');
const { model } = require('../config/geminiConfig');
const {
  generateImage,
  uploadImageFromBuffer,
  deleteImageFromGCS,
} = require('../config/imageService');
const { v4: uuidv4 } = require('uuid'); // Pastikan uuid diimpor jika digunakan

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

const addFavoriteRecipe = async (req, res) => {
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
    const filename = `recipes/${uuidv4()}.jpeg`; // Menambahkan nama file unik
    const imageUrl = await uploadImageFromBuffer(imageBuffer, filename); // Menggunakan filename

    // Memastikan ingredients dan instructions disimpan sebagai string JSON
    const ingredientsString = JSON.stringify(ingredients);
    const instructionsString = JSON.stringify(instructions);

    const [recipe, created] = await Recipe.findOrCreate({
      where: { recipeName: recipeName },
      defaults: {
        recipeName,
        description,
        ingredients: ingredientsString, // Disimpan sebagai string JSON
        instructions: instructionsString, // Disimpan sebagai string JSON
        imageUrl,
      },
      transaction: t,
    });

    // Periksa apakah resep sudah ada di favorit pengguna
    const existingFavorite = await Favorite.findOne({
        where: {
            UserId: userId,
            RecipeId: recipe.id
        },
        transaction: t
    });

    if (existingFavorite) {
        await t.rollback();
        return res.status(409).json({ error: 'Resep ini sudah ada di daftar favorit Anda.' });
    }

    await Favorite.create({
        UserId: userId,
        RecipeId: recipe.id,
    }, { transaction: t });

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

const getFavoriteRecipes = async (req, res) => { 
  try {
    const userId = req.user.id;
    const favoriteRecipes = await Recipe.findAll({
      include: {
        model: Favorite,
        where: { UserId: userId },
        attributes: [], // Tidak perlu atribut dari tabel Favorite itu sendiri
      },
    });
    res.status(200).json(favoriteRecipes);
  } catch (error) {
    console.error('Gagal mengambil favorit:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data favorit.' });
  }
};

const deleteFavoriteRecipe = async (req, res) => { 
  const t = await db.transaction();
  try {
    const { id } = req.params; // Menggunakan 'id' sesuai rute
    const user = req.user;

    const favorite = await Favorite.findOne({
      where: {
        UserId: user.id,
        RecipeId: id,
      },
      transaction: t,
    });

    if (!favorite) {
      await t.rollback();
      return res.status(404).json({ error: 'Resep favorit tidak ditemukan atau tidak ada di daftar Anda.' });
    }

    await favorite.destroy({ transaction: t });

    // Periksa apakah resep masih difavoritkan oleh pengguna lain
    const favoriteCount = await Favorite.count({
        where: { RecipeId: id },
        transaction: t
    });

    // Jika resep tidak lagi difavoritkan oleh siapa pun, hapus dari tabel Recipes dan GCS
    if (favoriteCount === 0) {
      const recipe = await Recipe.findByPk(id, { transaction: t });
      if (recipe && recipe.imageUrl) {
        await deleteImageFromGCS(recipe.imageUrl);
      }
      if (recipe) {
        await recipe.destroy({ transaction: t });
      }
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
    // Pastikan parameter diakses dengan nama yang benar, misal 'id' jika rute adalah /recipes/:id
    const recipe = await Recipe.findByPk(req.params.id); // Menggunakan req.params.id

    if (!recipe) {
      return res.status(404).json({ error: 'Resep tidak ditemukan.' });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error('Gagal mengambil detail resep:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data resep.' });
  }
};

const getFavoriteRecipeById = async (req, res) => {
  try {
    const userId = req.user.id;
    const recipeId = req.params.id; // Menggunakan 'id' sesuai rute /favorites/:id

    const favorite = await Favorite.findOne({
      where: {
        UserId: userId,
        RecipeId: recipeId,
      },
      include: [{ model: Recipe }], // Menggabungkan model Recipe untuk mendapatkan detail
    });

    if (!favorite) {
      return res.status(404).json({ error: 'Resep favorit tidak ditemukan untuk pengguna ini.' });
    }

    res.json(favorite.Recipe); // Mengembalikan objek Recipe yang terkait
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil detail resep favorit:', error);
    res.status(500).json({ error: 'Gagal mengambil detail resep favorit.' });
  }
};

module.exports = {
  generateRecipe,
  addFavoriteRecipe,      
  getFavoriteRecipes,      
  deleteFavoriteRecipe,
  getRecipeById,
  getFavoriteRecipeById,
};