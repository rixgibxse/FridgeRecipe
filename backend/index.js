if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const recipeRoutes = require('./routes/recipeRoutes');
const authRoutes = require('./routes/authRoutes');
const { db } = require('./models');

// Import test functions
const { testGeminiConnection } = require('./config/geminiConfig');
const { testStabilityConnection, testGCSConnection } = require('./config/imageService');
const { testSendGridConnection } = require('./controllers/authController');

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api', recipeRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/health', async (req, res) => {
  const healthStatus = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    services: {
      database: 'checking...',
      gemini: 'checking...',
      stability: 'checking...',
      gcs: 'checking...',
      sendgrid: 'checking...'
    }
  };

  try {
    // Check database
    await db.authenticate();
    healthStatus.services.database = 'OK';
  } catch (error) {
    healthStatus.services.database = 'ERROR';
    healthStatus.status = 'DEGRADED';
  }

  // Check Gemini
  try {
    const geminiStatus = await testGeminiConnection();
    healthStatus.services.gemini = geminiStatus ? 'OK' : 'ERROR';
    if (!geminiStatus) healthStatus.status = 'DEGRADED';
  } catch (error) {
    healthStatus.services.gemini = 'ERROR';
    healthStatus.status = 'DEGRADED';
  }

  // Check Stability AI
  try {
    const stabilityStatus = await testStabilityConnection();
    healthStatus.services.stability = stabilityStatus ? 'OK' : 'ERROR';
    if (!stabilityStatus) healthStatus.status = 'DEGRADED';
  } catch (error) {
    healthStatus.services.stability = 'ERROR';
    healthStatus.status = 'DEGRADED';
  }

  // Check GCS
  try {
    const gcsStatus = await testGCSConnection();
    healthStatus.services.gcs = gcsStatus ? 'OK' : 'ERROR';
    if (!gcsStatus) healthStatus.status = 'DEGRADED';
  } catch (error) {
    healthStatus.services.gcs = 'ERROR';
    healthStatus.status = 'DEGRADED';
  }

  // Check SendGrid
  try {
    const sendgridStatus = await testSendGridConnection();
    healthStatus.services.sendgrid = sendgridStatus ? 'OK' : 'ERROR';
    if (!sendgridStatus) healthStatus.status = 'DEGRADED';
  } catch (error) {
    healthStatus.services.sendgrid = 'ERROR';
    healthStatus.status = 'DEGRADED';
  }

  const statusCode = healthStatus.status === 'OK' ? 200 : 503;
  res.status(statusCode).json(healthStatus);
});

// Add a simple root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Fridge Recipe Backend API',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Environment variables check
const checkEnvironmentVariables = () => {
  const requiredVars = [
    'DB_USER',
    'DB_PASS',
    'DB_NAME',
    'JWT_SECRET',
    'GEMINI_API_KEY',
    'STABILITY_API_KEY',
    'GCS_BUCKET_NAME',
    'SENDGRID_API_KEY'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    console.error('🔧 Please set these environment variables and restart the application');
    // Don't exit in production, just log the error
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }
  } else {
    console.log('✅ All required environment variables are present');
  }
};

const connectWithRetry = async (retries = 3, delay = 3000) => {
  while (retries > 0) {
    try {
      await db.authenticate();
      console.log('✅ Database connection successful');
      return;
    } catch (error) {
      console.error(`❌ Database connection failed. Retrying in ${delay / 1000} seconds... (${retries - 1} attempts left)`);
      console.error('Error details:', error.message);
      
      retries -= 1;
      if (retries === 0) {
        console.error('❌ All database connection attempts failed');
        throw error;
      }
      
      await new Promise(res => setTimeout(res, delay));
    }
  }
};

const startServer = async () => {
  try {
    console.log('🚀 Starting server initialization...');
    console.log('📍 Port:', port);
    console.log('🌍 Environment:', process.env.NODE_ENV || 'development');
    
    // 1. Check environment variables
    checkEnvironmentVariables();
    
    // 2. Connect to database
    await connectWithRetry();
    
    // 3. Start server first, then test services
    const server = app.listen(port, '0.0.0.0', () => {
      console.log(`🎉 Server running successfully on port: ${port}`);
      console.log(`🔍 Health check available at: http://localhost:${port}/health`);
      console.log(`📡 Server is listening on 0.0.0.0:${port}`);
    });

    // Set server timeout
    server.timeout = 120000; // 2 minutes

    // 4. Test external services (non-blocking)
    console.log('🔍 Testing external services...');
    
    // Test services in parallel but don't block startup
    Promise.all([
      testGeminiConnection().catch(err => console.error('❌ Gemini test failed:', err.message)),
      testStabilityConnection().catch(err => console.error('❌ Stability AI test failed:', err.message)),
      testGCSConnection().catch(err => console.error('❌ GCS test failed:', err.message)),
      testSendGridConnection().catch(err => console.error('❌ SendGrid test failed:', err.message))
    ]).then(() => {
      console.log('✅ External services test completed');
    }).catch(err => {
      console.error('⚠️ Some external services failed, but server is running');
    });
    
    // Handle server errors
    server.on('error', (error) => {
      console.error('💥 Server error:', error);
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${port} is already in use`);
      }
    });

  } catch (error) {
    console.error('💥 Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully...');
  process.exit(0);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

startServer();