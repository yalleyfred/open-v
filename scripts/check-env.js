#!/usr/bin/env node

/**
 * Environment Variables Checker
 * This script checks if all required environment variables are set
 */

// Load environment variables from .env file
require('dotenv').config();

const requiredEnvVars = [
  'NODE_ENV',
  'PORT',
  'SECRET_KEY',
  'DB_HOST',
  'DB_NAME', 
  'DB_USER',
  'DB_PASSWORD',
  'PDB_HOST',
  'PDB_NAME',
  'PDB_USER', 
  'PDB_PASSWORD',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET'
];

const optionalEnvVars = [
  'ORIGIN',
  'CREDENTIALS',
  'LOG_FORMAT',
  'LOG_DIR',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASSWORD',
  'REDIS_HOST',
  'REDIS_PORT'
];

console.log('🔍 Checking Environment Variables...\n');

let missingRequired = [];
let missingOptional = [];

// Check required variables
requiredEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    missingRequired.push(varName);
  } else {
    console.log(`✅ ${varName}: Set`);
  }
});

// Check optional variables
optionalEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    missingOptional.push(varName);
  } else {
    console.log(`✅ ${varName}: Set`);
  }
});

console.log('\n' + '='.repeat(50));

if (missingRequired.length > 0) {
  console.log('❌ Missing Required Environment Variables:');
  missingRequired.forEach(varName => {
    console.log(`   - ${varName}`);
  });
  console.log('\n❗ Please set these variables in your .env file before starting the application.');
  process.exit(1);
} else {
  console.log('✅ All required environment variables are set!');
}

if (missingOptional.length > 0) {
  console.log('\n⚠️  Missing Optional Environment Variables:');
  missingOptional.forEach(varName => {
    console.log(`   - ${varName}`);
  });
  console.log('\n💡 These are optional but may be needed for full functionality.');
}

console.log('\n🚀 Environment check complete!');
