const { DataTypes } = require('sequelize');
const { db } = require('../config/database');

const Favorite = db.define('Favorite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
}, {
  timestamps: true,
});

module.exports = Favorite;