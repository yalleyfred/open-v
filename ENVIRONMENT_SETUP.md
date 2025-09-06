# Environment Setup Guide

This guide will help you set up the environment variables for the Open-V application.

## 🚀 Quick Setup

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file and replace the placeholder values with your actual credentials:**
   ```bash
   nano .env  # or use your preferred editor
   ```

3. **Check if all environment variables are properly set:**
   ```bash
   npm run env:check
   ```

## 📋 Required Environment Variables

### Application Configuration
- `NODE_ENV`: Application environment (development/production/test)
- `PORT`: Port number for the application (default: 9001)

### Security Configuration  
- `SECRET_KEY`: JWT secret key (must be at least 32 characters)
- `ORIGIN`: CORS origin URL (default: http://localhost:3000)
- `CREDENTIALS`: Enable CORS credentials (true/false)

### Database Configuration (Development)
- `DB_HOST`: Database host (default: localhost)
- `DB_PORT`: Database port (default: 5432)
- `DB_NAME`: Database name
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password

### Production Database Configuration
- `PDB_HOST`: Production database host
- `PDB_PORT`: Production database port
- `PDB_NAME`: Production database name
- `PDB_USER`: Production database username
- `PDB_PASSWORD`: Production database password

### Cloudinary Configuration (Required for file uploads)
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Your Cloudinary API key
- `CLOUDINARY_API_SECRET`: Your Cloudinary API secret

## 🔧 Optional Environment Variables

### Logging Configuration
- `LOG_FORMAT`: Log format (default: combined)
- `LOG_DIR`: Log directory (default: ../logs)

### Upload Configuration
- `UPLOAD_FOLDER`: Upload directory (default: uploads)
- `MAX_FILE_SIZE`: Maximum file size in bytes (default: 10MB)

### Email Configuration (for notifications)
- `SMTP_HOST`: SMTP server host
- `SMTP_PORT`: SMTP server port
- `SMTP_USER`: SMTP username
- `SMTP_PASSWORD`: SMTP password

### Redis Configuration (for caching)
- `REDIS_HOST`: Redis host (default: localhost)
- `REDIS_PORT`: Redis port (default: 6379)
- `REDIS_PASSWORD`: Redis password

### Rate Limiting Configuration
- `RATE_LIMIT_WINDOW_MS`: Rate limit window in milliseconds (default: 900000)
- `RATE_LIMIT_MAX_REQUESTS`: Max requests per window (default: 100)
- `AUTH_RATE_LIMIT_MAX_REQUESTS`: Max auth requests per window (default: 5)

## 🔒 Security Best Practices

1. **Never commit the `.env` file to version control**
2. **Use strong, unique values for `SECRET_KEY`**
3. **Rotate credentials regularly**
4. **Use different credentials for development and production**
5. **Restrict database user permissions to minimum required**

## 🚨 Cloudinary Security Warning

**IMPORTANT**: The current `.env` file contains your actual Cloudinary credentials that were found hardcoded in your application. For security reasons:

1. **Regenerate your Cloudinary API credentials immediately**
2. **Update the `.env` file with the new credentials**
3. **Ensure the old credentials are revoked**

## 📝 Getting Cloudinary Credentials

1. Go to [Cloudinary Console](https://cloudinary.com/console)
2. Sign in to your account
3. Copy your Cloud Name, API Key, and API Secret
4. Paste them into your `.env` file

## 🧪 Testing Your Setup

Run the environment checker to ensure everything is configured correctly:

```bash
npm run env:check
```

If all required variables are set, you'll see:
```
✅ All required environment variables are set!
🚀 Environment check complete!
```

## 🚀 Starting the Application

Once your environment is properly configured:

```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

The environment checker will automatically run before starting the application.

## 🆘 Troubleshooting

### Common Issues

1. **"Missing Required Environment Variables" error**
   - Check that all required variables are set in your `.env` file
   - Ensure there are no typos in variable names
   - Make sure the `.env` file is in the root directory

2. **Database connection errors**
   - Verify database credentials are correct
   - Ensure the database server is running
   - Check network connectivity to the database

3. **Cloudinary upload failures**
   - Verify Cloudinary credentials are correct
   - Check that your Cloudinary account is active
   - Ensure proper API permissions are set

### Getting Help

If you encounter issues:
1. Run `npm run env:check` to verify your configuration
2. Check the application logs for detailed error messages
3. Ensure all required services (database, Redis, etc.) are running
