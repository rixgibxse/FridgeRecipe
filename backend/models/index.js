const { db } = require('../config/database');
const User = require('./user');
const Recipe = require('./recipe');
const Favorite = require('./favorite');

// Mendefinisikan hubungan Many-to-Many
User.belongsToMany(Recipe, { through: Favorite });
Recipe.belongsToMany(User, { through: Favorite });

module.exports = {
  db,
  User,
  Recipe,
  Favorite,
};