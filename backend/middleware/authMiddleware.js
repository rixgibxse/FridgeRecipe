// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const protect = async (req, res, next) => {
  let token;

  // 1. Cek apakah ada token di header Authorization
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Ambil token dari header (setelah kata 'Bearer ')
      token = req.headers.authorization.split(' ')[1];

      // 3. Verifikasi token menggunakan secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Cari pengguna di database berdasarkan id dari token
      // dan lampirkan ke object request agar bisa diakses oleh controller selanjutnya
      req.user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] }, // Jangan ikutkan password
      });

      if (!req.user) {
        return res.status(401).json({ error: 'Not authorized, user not found' });
      }

      // 5. Lanjutkan ke controller selanjutnya
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ error: 'Not authorized, no token' });
  }
};

module.exports = { protect };