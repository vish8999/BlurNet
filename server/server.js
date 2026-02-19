const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const envPath = path.resolve(__dirname, '.env');

let envResult = dotenv.config({ path: envPath, encoding: 'utf8' });
if (envResult.error) {
  console.error('Failed to load .env:', envResult.error);
  process.exit(1);
}

// If `.env` was saved as UTF-16 (common with Windows Notepad), parsing can yield `{}`.
if (!envResult.parsed || Object.keys(envResult.parsed).length === 0) {
  const utf16Result = dotenv.config({ path: envPath, encoding: 'utf16le' });
  if (!utf16Result.error && utf16Result.parsed && Object.keys(utf16Result.parsed).length > 0) {
    envResult = utf16Result;
  }
}

const app = express();

app.use(cors());
app.use(express.json());

const parsedEnv = envResult.parsed ?? {};

// Windows files sometimes include a UTF-8 BOM, which can turn "PORT" into "\ufeffPORT".
if (!parsedEnv.PORT && parsedEnv['\ufeffPORT']) parsedEnv.PORT = parsedEnv['\ufeffPORT'];
if (!parsedEnv.MONGO_URI && parsedEnv['\ufeffMONGO_URI']) parsedEnv.MONGO_URI = parsedEnv['\ufeffMONGO_URI'];

function pickEnv(name) {
  const value = process.env[name];
  if (typeof value === 'string' && value.trim() !== '') return value;
  const parsedValue = parsedEnv[name];
  if (typeof parsedValue === 'string' && parsedValue.trim() !== '') return parsedValue;
  return undefined;
}

const PORT = pickEnv('PORT');
const MONGO_URI = pickEnv('MONGO_URI');

if (!PORT) {
  console.error('PORT is not defined in .env');
  process.exit(1);
}

if (!MONGO_URI) {
  console.error('MONGO_URI is not defined in .env');
  process.exit(1);
}

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

app.get('/api/test', (req, res) => {
  res.json({ message: 'API Working' });
});

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
