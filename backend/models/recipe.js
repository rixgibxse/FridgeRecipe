const { DataTypes } = require('sequelize');
const { db } = require('../config/database');

const Recipe = db.define('Recipe', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  recipeName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  ingredients: {
    type: DataTypes.JSON, // Menyimpan array bahan sebagai JSON
    allowNull: false,
  },
  instructions: {
    type: DataTypes.JSON, // Menyimpan array instruksi sebagai JSON
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Recipe;