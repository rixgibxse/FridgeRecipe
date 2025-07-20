// routes/authRoutes.js
const express = require('express');
const {
    register,
    login,
    forgotPassword,
    resetPassword,
} = require('../controllers/authController');

const router = express.Router();

// Rute untuk registrasi pengguna baru
router.post('/register', register);

// Rute untuk login pengguna
router.post('/login', login);

// Rute untuk mengirim email reset password
router.post('/forgot-password', forgotPassword);

// Rute untuk mereset password menggunakan token
router.post('/reset-password/:token', resetPassword);

module.exports = router;