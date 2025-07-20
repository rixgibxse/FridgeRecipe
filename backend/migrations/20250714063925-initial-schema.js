'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Buat tabel Users
    await queryInterface.createTable('Users', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      username: { type: Sequelize.STRING, allowNull: false, unique: true },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      resetPasswordToken: { type: Sequelize.STRING, allowNull: true },
      resetPasswordExpires: { type: Sequelize.DATE, allowNull: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });

    // Buat tabel Recipes
    await queryInterface.createTable('Recipes', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      recipeName: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT },
      ingredients: { type: Sequelize.JSON, allowNull: false },
      instructions: { type: Sequelize.JSON, allowNull: false },
      imageUrl: { type: Sequelize.STRING, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });

    // Buat tabel Favorites
    await queryInterface.createTable('Favorites', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      UserId: { 
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE' 
      },
      RecipeId: { 
        type: Sequelize.INTEGER,
        references: { model: 'Recipes', key: 'id' },
        onDelete: 'CASCADE' 
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },

  async down(queryInterface, Sequelize) {
    // Hapus tabel dalam urutan terbalik untuk menghindari masalah foreign key
    await queryInterface.dropTable('Favorites');
    await queryInterface.dropTable('Recipes');
    await queryInterface.dropTable('Users');
  }
};