// backend/models/index.js
const { db } = require('../config/database');
const User = require('./user');
const Recipe = require('./recipe');
const Favorite = require('./favorite');

Favorite.belongsTo(User, { foreignKey: 'UserId' });
Favorite.belongsTo(Recipe, { foreignKey: 'RecipeId' });

User.hasMany(Favorite, { foreignKey: 'UserId' });
Recipe.hasMany(Favorite, { foreignKey: 'RecipeId' });

User.belongsToMany(Recipe, { through: Favorite, foreignKey: 'UserId' });
Recipe.belongsToMany(User, { through: Favorite, foreignKey: 'RecipeId' });

module.exports = {
  db,
  User,
  Recipe,
  Favorite,
};