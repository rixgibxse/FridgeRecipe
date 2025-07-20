const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const { User } = require('../models');
const { Op } = require('sequelize');

// Validasi environment variables
const requiredEnvVars = ['SENDGRID_API_KEY', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars);
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

console.log('✅ All required environment variables for auth controller are present');

// Setup SendGrid with proper error handling
try {
  // Clean the API key - remove any potential quotes or whitespace
  const cleanApiKey = process.env.SENDGRID_API_KEY.trim().replace(/^["']|["']$/g, '');
  
  // Validate API key format
  if (!cleanApiKey.startsWith('SG.')) {
    throw new Error('Invalid SendGrid API key format. Must start with SG.');
  }
  
  sgMail.setApiKey(cleanApiKey);
  console.log('✅ SendGrid API key configured successfully');
} catch (error) {
  console.error('❌ Failed to configure SendGrid:', error);
  throw error;
}

// Test SendGrid connection
const testSendGridConnection = async () => {
  try {
    // Test with a simple API call to validate the API key
    const request = {
      method: 'GET',
      url: '/v3/user/account',
    };
    
    const response = await sgMail.request(request);
    console.log('✅ SendGrid connection test successful');
    return true;
  } catch (error) {
    console.error('❌ SendGrid connection test failed:', error.message);
    return false;
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required.' });
    }

    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Email is already registered.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    console.log('✅ User registered successfully:', newUser.email);
    
    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt,
    });
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log('✅ User logged in successfully:', user.email);
    
    res.status(200).json({
      message: 'Login successful',
      token: token,
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ error: 'An error occurred during login.' });
  }
};

const forgotPassword = async (req, res) => {
  let user;
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    user = await User.findOne({ where: { email: email } });
    if (!user) {
      // Return success message even if user doesn't exist for security
      return res.status(200).json({ message: 'Jika email terdaftar, link reset akan dikirim.' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const baseUrl = (process.env.FRONTEND_URL || 'http://localhost:3000').replace(/\/$/, '');
    const resetUrl = `${baseUrl}/reset-password/${resetToken}`;
    
    const msg = {
      to: user.email,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL || '17210999@bsi.ac.id',
        name: 'Fridge Recipe App'
      },
      subject: 'Link Reset Password Fridge Recipe',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Reset Password Fridge Recipe</h2>
          <p>Anda menerima email ini karena Anda (atau orang lain) meminta untuk mereset password akun Anda.</p>
          <p>Silakan klik link berikut untuk mereset password Anda:</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
          <p>Atau salin dan tempel URL berikut ke browser Anda:</p>
          <p style="word-break: break-all;">${resetUrl}</p>
          <p>Link ini akan kedaluwarsa dalam 1 jam.</p>
          <p>Jika Anda tidak meminta reset password, abaikan email ini dan password Anda tidak akan berubah.</p>
        </div>
      `,
      text: `
        Anda menerima email ini karena Anda (atau orang lain) meminta untuk mereset password akun Anda.
        
        Silakan klik link berikut, atau salin ke browser Anda untuk menyelesaikan proses:
        ${resetUrl}
        
        Link ini akan kedaluwarsa dalam 1 jam.
        
        Jika Anda tidak meminta ini, abaikan email ini dan password Anda tidak akan berubah.
      `,
    };

    await sgMail.send(msg);
    console.log('✅ Password reset email sent successfully to:', user.email);
    
    res.status(200).json({ message: 'Jika email terdaftar, link reset akan dikirim.' });
  } catch (error) {
    console.error('❌ Forgot password error:', error);
    
    // Rollback user changes if email sending failed
    if (user) {
      try {
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();
      } catch (rollbackError) {
        console.error('❌ Failed to rollback user changes:', rollbackError);
      }
    }
    
    res.status(500).json({ error: 'Gagal mengirim email reset password.' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const resetToken = req.params.token;
    const { password } = req.body;
    
    if (!password) {
      return res.status(400).json({ error: 'Password baru dibutuhkan.' });
    }

    const user = await User.findOne({
      where: {
        resetPasswordToken: resetToken,
        resetPasswordExpires: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      return res.status(400).json({ error: 'Token reset password tidak valid atau sudah kedaluwarsa.' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    console.log('✅ Password reset successfully for user:', user.email);
    
    res.status(200).json({ message: 'Password berhasil direset.' });
  } catch (error) {
    console.error('❌ Reset password error:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mereset password.' });
  }
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  testSendGridConnection,
};