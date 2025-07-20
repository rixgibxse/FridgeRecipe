const { Sequelize } = require('sequelize');

// Konfigurasi dasar, selalu diambil dari environment variables
const dbConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

if (process.env.DB_INSTANCE_CONNECTION_NAME) {
  dbConfig.dialectOptions = {
    socketPath: `/cloudsql/${process.env.DB_INSTANCE_CONNECTION_NAME}`
  };
} else {
  dbConfig.host = '127.0.0.1';
}

const db = new Sequelize(dbConfig);

const testDbConnection = async () => {
  try {
    await db.authenticate();
    console.log('Koneksi ke database berhasil.');
  } catch (error) {
    console.error('Tidak dapat terhubung ke database:', error);
  }
};

module.exports = { db, testDbConnection };