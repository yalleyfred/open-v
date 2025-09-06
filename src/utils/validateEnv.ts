import { cleanEnv, port, str, num } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    // Application Configuration
    NODE_ENV: str({ choices: ['development', 'production', 'test'] }),
    PORT: port(),
    
    // Security Configuration
    SECRET_KEY: str({ desc: 'JWT secret key' }),
    ORIGIN: str({ default: 'http://localhost:3000' }),
    CREDENTIALS: str({ choices: ['true', 'false'], default: 'true' }),
    
    // Database Configuration
    DB_HOST: str({ default: 'localhost' }),
    DB_PORT: port({ default: 5432 }),
    DB_NAME: str(),
    DB_USER: str(),
    DB_PASSWORD: str(),
    
    // Production Database Configuration
    PDB_HOST: str(),
    PDB_NAME: str(),
    PDB_USER: str(),
    PDB_PASSWORD: str(),
    PDB_PORT: port({ default: 5432 }),
    
    // Cloudinary Configuration
    CLOUDINARY_CLOUD_NAME: str(),
    CLOUDINARY_API_KEY: str(),
    CLOUDINARY_API_SECRET: str(),
    
    // Logging Configuration
    LOG_DIR: str({ default: '../logs' }),
    LOG_FORMAT: str({ default: 'combined' }),
    
    // Upload Configuration
    UPLOAD_FOLDER: str({ default: 'uploads' }),
    MAX_FILE_SIZE: num({ default: 10485760 }),
    
    // Optional Email Configuration
    SMTP_HOST: str({ default: '' }),
    SMTP_PORT: port({ default: 587 }),
    SMTP_USER: str({ default: '' }),
    SMTP_PASSWORD: str({ default: '' }),
    
    // Optional Redis Configuration
    REDIS_HOST: str({ default: 'localhost' }),
    REDIS_PORT: port({ default: 6379 }),
    REDIS_PASSWORD: str({ default: '' }),
    
    // Rate Limiting Configuration
    RATE_LIMIT_WINDOW_MS: num({ default: 900000 }),
    RATE_LIMIT_MAX_REQUESTS: num({ default: 100 }),
    AUTH_RATE_LIMIT_MAX_REQUESTS: num({ default: 5 }),
  });
};

export default validateEnv;
