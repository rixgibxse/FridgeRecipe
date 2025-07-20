const fetch = require('node-fetch');
const FormData = require('form-data');
const { Storage } = require('@google-cloud/storage');

// Validasi environment variables
const requiredEnvVars = ['STABILITY_API_KEY', 'GCS_BUCKET_NAME'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars);
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

console.log('✅ All required environment variables for image service are present');

// Inisialisasi Google Cloud Storage
let storage;
let bucket;

try {
  storage = new Storage();
  bucket = storage.bucket(process.env.GCS_BUCKET_NAME);
  console.log('✅ Google Cloud Storage initialized successfully');
} catch (error) {
  console.error('❌ Failed to initialize Google Cloud Storage:', error);
  throw error;
}

/**
 * Clean and validate Stability API key
 */
const getCleanApiKey = () => {
  let apiKey = process.env.STABILITY_API_KEY;
  
  if (!apiKey) {
    throw new Error('STABILITY_API_KEY is not set');
  }
  
  // Remove any quotes and whitespace
  apiKey = apiKey.trim().replace(/^["']|["']$/g, '');
  
  // Remove 'Bearer ' prefix if it exists
  if (apiKey.startsWith('Bearer ')) {
    apiKey = apiKey.substring(7);
  }
  
  // Validate that we have a key
  if (!apiKey || apiKey.length < 10) {
    throw new Error('Invalid STABILITY_API_KEY format');
  }
  
  return apiKey;
};

/**
 * Test Stability AI connection
 */
const testStabilityConnection = async () => {
  try {
    const cleanApiKey = getCleanApiKey();
    
    const response = await fetch('https://api.stability.ai/v1/user/account', {
      headers: {
        'Authorization': `Bearer ${cleanApiKey}`,
      },
    });
    
    if (response.ok) {
      console.log('✅ Stability AI connection test successful');
      return true;
    } else {
      console.error('❌ Stability AI connection test failed:', response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.error('❌ Stability AI connection test error:', error);
    return false;
  }
};

/**
 * HANYA membuat gambar menggunakan Stability AI dan mengembalikan data mentahnya (buffer).
 */
const generateImage = async (imagePrompt) => {
  try {
    console.log('🎨 Generating image with prompt:', imagePrompt);
    
    const cleanApiKey = getCleanApiKey();
    
    const formData = new FormData();
    formData.append('prompt', imagePrompt);
    formData.append('output_format', 'png');

    const response = await fetch(
      'https://api.stability.ai/v2beta/stable-image/generate/core',
      {
        method: 'POST',
        headers: {
          ...formData.getHeaders(),
          'Authorization': `Bearer ${cleanApiKey}`,
          'Accept': 'image/*',
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Stability AI request failed:', response.status, response.statusText, errorText);
      throw new Error(`Stability AI request failed with status ${response.status}: ${errorText}`);
    }

    const buffer = await response.buffer();
    console.log('✅ Image generated successfully, size:', buffer.length, 'bytes');
    return buffer;
  } catch (error) {
    console.error('❌ Error in generateImage:', error);
    throw error;
  }
};

/**
 * HANYA mengunggah data gambar mentah (buffer) ke GCS dan mengembalikan URL publik.
 */
const uploadImageFromBuffer = async (imageBuffer) => {
  try {
    console.log('📤 Uploading image to GCS, size:', imageBuffer.length, 'bytes');
    
    const fileName = `recipe-images/${Date.now()}-${Math.random().toString(36).substring(7)}.png`;
    const file = bucket.file(fileName);

    const stream = file.createWriteStream({
      metadata: {
        contentType: 'image/png',
      },
      resumable: false, // Untuk file kecil, disable resumable upload
    });

    return new Promise((resolve, reject) => {
      stream.on('error', (err) => {
        console.error('❌ GCS upload error:', err);
        reject(err);
      });
      
      stream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/${fileName}`;
        console.log('✅ Image uploaded successfully:', publicUrl);
        resolve(publicUrl);
      });
      
      stream.end(imageBuffer);
    });
  } catch (error) {
    console.error('❌ Error in uploadImageFromBuffer:', error);
    throw error;
  }
};

/**
 * Menghapus gambar dari GCS berdasarkan URL publiknya.
 */
const deleteImageFromGCS = async (imageUrl) => {
  try {
    console.log('🗑️ Deleting image from GCS:', imageUrl);
    
    const prefix = `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/`;
    if (!imageUrl.startsWith(prefix)) {
      throw new Error('Invalid image URL format');
    }
    
    const fileName = imageUrl.substring(prefix.length);
    await bucket.file(fileName).delete();
    console.log('✅ Image deleted successfully:', fileName);
  } catch (error) {
    console.error('❌ Failed to delete image from GCS:', error);
    throw error;
  }
};

/**
 * Test GCS connection
 */
const testGCSConnection = async () => {
  try {
    await bucket.getMetadata();
    console.log('✅ GCS connection test successful');
    return true;
  } catch (error) {
    console.error('❌ GCS connection test failed:', error);
    return false;
  }
};

module.exports = {
  generateImage,
  uploadImageFromBuffer,
  deleteImageFromGCS,
  testStabilityConnection,
  testGCSConnection,
};