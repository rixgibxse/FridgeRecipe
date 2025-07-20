const { DataTypes } = require('sequelize');
const { db } = require('../config/database');

const User = db.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    resetPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true, // Boleh null karena hanya diisi saat reset
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
    allowNull: true, // Boleh null
  },
}, {
  timestamps: true,
});

module.exports = User;