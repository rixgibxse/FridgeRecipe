const { Sequelize } = require('sequelize');

// Konfigurasi yang Benar
const dbConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

// Tambahkan opsi socket path HANYA jika diperlukan (untuk Cloud SQL Auth Proxy)
if (process.env.DB_INSTANCE_CONNECTION_NAME) {
  dbConfig.dialectOptions = {
    socketPath: `/cloudsql/${process.env.DB_INSTANCE_CONNECTION_NAME}`
  };
}


const db = new Sequelize(dbConfig);

const testDbConnection = async () => {
  try {
    // ================== DEBUGGING DATABASE CONNECTION ==================
    console.log("Reading database configuration for connection test...");
    console.log(`DB_HOST: ${process.env.DB_HOST}`);
    console.log(`DB_USER: ${process.env.DB_USER}`);
    console.log(`DB_NAME: ${process.env.DB_NAME}`);
    console.log("--- End of connection debug ---");
    // ===================================================================

    await db.authenticate();
    console.log('✅ Koneksi ke database berhasil.');
  } catch (error) {
    console.error('❌ Tidak dapat terhubung ke database:', error);
    // Hentikan proses jika koneksi gagal, agar Cloud Run tahu ada masalah
    process.exit(1); 
  }
};

module.exports = { db, testDbConnection };