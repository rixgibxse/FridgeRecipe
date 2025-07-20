const { GoogleGenerativeAI } = require('@google/generative-ai');

// Validasi API key dengan error handling yang lebih baik
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('❌ GEMINI_API_KEY tidak ditemukan dalam environment variables');
  throw new Error('GEMINI_API_KEY is required');
}

console.log('✅ GEMINI_API_KEY loaded successfully');

let genAI;
let model;

try {
  genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  console.log('✅ Gemini model initialized successfully');
} catch (error) {
  console.error('❌ Failed to initialize Gemini model:', error);
  throw error;
}

// Test connection function
const testGeminiConnection = async () => {
  try {
    const result = await model.generateContent('Test connection');
    console.log('✅ Gemini connection test successful');
    return true;
  } catch (error) {
    console.error('❌ Gemini connection test failed:', error);
    return false;
  }
};

module.exports = { model, testGeminiConnection };