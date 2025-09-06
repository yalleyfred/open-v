import { config } from 'dotenv';
config({ path: `.env` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';

// Application Configuration
export const NODE_ENV = String(process.env.NODE_ENV || 'development');
export const node_env = String(process.env.NODE_ENV || 'development');
export const PORT = Number(process.env.PORT || 9001);

// Security Configuration
export const SECRET_KEY = String(process.env.SECRET_KEY);
export const ORIGIN = String(process.env.ORIGIN || 'http://localhost:3000');

// Database Configuration (Local/Development)
export const DB_HOST = String(process.env.DB_HOST || 'localhost');
export const DB_PORT = Number(process.env.DB_PORT || 5432);
export const db_name = String(process.env.DB_NAME);
export const db_host = String(process.env.DB_HOST || 'localhost');
export const db_user = String(process.env.DB_USER);
export const db_password = String(process.env.DB_PASSWORD);

// Production Database Configuration
export const PDB_NAME = String(process.env.PDB_NAME);
export const PDB_PORT = Number(process.env.PDB_PORT || 5432);
export const PDB_HOST = String(process.env.PDB_HOST);
export const PDB_USER = String(process.env.PDB_USER);
export const PDB_PASSWORD = String(process.env.PDB_PASSWORD);

// Cloudinary Configuration
export const CLOUDINARY_CLOUD_NAME = String(process.env.CLOUDINARY_CLOUD_NAME);
export const CLOUDINARY_API_KEY = String(process.env.CLOUDINARY_API_KEY);
export const CLOUDINARY_API_SECRET = String(process.env.CLOUDINARY_API_SECRET);

// Logging Configuration
export const LOG_DIR = String(process.env.LOG_DIR || '../logs');
export const LOG_FORMAT = String(process.env.LOG_FORMAT || 'combined');

// Upload Configuration
export const UPLOAD_FOLDER = String(process.env.UPLOAD_FOLDER || 'uploads');
export const MAX_FILE_SIZE = Number(process.env.MAX_FILE_SIZE || 10485760); // 10MB default

// Email Configuration (if needed)
export const SMTP_HOST = String(process.env.SMTP_HOST);
export const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
export const SMTP_USER = String(process.env.SMTP_USER);
export const SMTP_PASSWORD = String(process.env.SMTP_PASSWORD);

// Redis Configuration (if needed)
export const REDIS_HOST = String(process.env.REDIS_HOST || 'localhost');
export const REDIS_PORT = Number(process.env.REDIS_PORT || 6379);
export const REDIS_PASSWORD = String(process.env.REDIS_PASSWORD || '');

// Rate Limiting Configuration
export const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS || 900000); // 15 minutes
export const RATE_LIMIT_MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX_REQUESTS || 100);
export const AUTH_RATE_LIMIT_MAX_REQUESTS = Number(process.env.AUTH_RATE_LIMIT_MAX_REQUESTS || 5);

