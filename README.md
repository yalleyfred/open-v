# Open-V API

A secure, scalable TypeScript-based REST API for educational platform management, built with Express.js, Sequelize ORM, and comprehensive security features.

## 🚀 Features

### 🎓 Core Functionality
- **Student Management**: Complete CRUD operations for student profiles
- **Course Management**: Course creation, updates, and media handling
- **Topic Management**: Hierarchical content organization within courses
- **Admin Panel**: Administrative user management and oversight
- **Authentication**: JWT-based authentication for students and admins

### 🛡️ Security Features
- **Rate Limiting**: DDoS protection with configurable limits
- **Input Sanitization**: XSS prevention and data validation
- **Password Security**: bcrypt hashing with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Environment Variables**: Secure credential management
- **Security Headers**: Helmet.js integration
- **Input Validation**: Comprehensive class-validator rules

### 📋 Data Validation
- **DTO Validation**: Type-safe data transfer objects
- **Business Rules**: Email, phone, and password complexity validation
- **Error Handling**: User-friendly validation error messages
- **Request Sanitization**: Automatic input cleaning

## 🏗️ Architecture

### Tech Stack
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: class-validator + class-transformer
- **File Upload**: Multer + Cloudinary
- **Logging**: Winston
- **Security**: Helmet, express-rate-limit, bcrypt

### Project Structure
```
src/
├── controllers/        # Request handlers and API endpoints
├── services/          # Business logic and data operations
├── models/            # Sequelize database models
├── dtos/              # Data transfer objects with validation
├── interfaces/        # TypeScript interface definitions
├── middlewares/       # Express middlewares (auth, validation, security)
├── routes/            # API route definitions
├── utils/             # Utility functions and helpers
└── config/            # Application configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js (>= 18.17.0)
- PostgreSQL database
- Cloudinary account (for file uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yalleyfred/open-v.git
   cd open-v
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_NAME=your_database_name
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_PORT=5432

   # Production Database (if different)
   PDB_HOST=your_prod_host
   PDB_NAME=your_prod_db
   PDB_USER=your_prod_user
   PDB_PASSWORD=your_prod_password
   PDB_PORT=5432

   # Authentication
   SECRET_KEY=your_jwt_secret_key

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Application
   NODE_ENV=development
   PORT=3000
   ```

5. **Database setup**
   ```bash
   # Run migrations
   npx sequelize-cli db:migrate
   
   # Optional: Run seeders
   npx sequelize-cli db:seed:all
   ```

6. **Build and start**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm run build
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Authentication Headers
```http
Authorization: Bearer <jwt_token>
```

### Core Endpoints

#### Authentication
```http
POST /auth/signup           # Student registration
POST /auth/login            # Student login
POST /auth/logout           # Student logout

POST /admin/signup          # Admin registration
POST /admin/login           # Admin login
POST /admin/logout          # Admin logout
```

#### Students
```http
GET    /admin/students      # Get all students (admin only)
GET    /admin/students/:id  # Get student by ID (admin only)
POST   /admin/students      # Create student (admin only)
PUT    /admin/students/:id  # Update student (admin only)
DELETE /admin/students/:id  # Delete student (admin only)
```

#### Courses
```http
GET    /api/courses         # Get all courses
GET    /api/courses/:id     # Get course by ID
POST   /api/courses         # Create course (admin only)
PUT    /api/courses/:id     # Update course (admin only)
DELETE /api/courses/:id     # Delete course (admin only)
```

#### Topics
```http
GET    /api/topics              # Get all topics
GET    /api/topics/:id          # Get topic by ID
GET    /api/topics/course/:courseId  # Get topics by course
POST   /api/topics             # Create topic (admin only)
PUT    /api/topics/:id          # Update topic (admin only)
DELETE /api/topics/:id          # Delete topic (admin only)
```

### Request/Response Examples

#### Student Registration
```http
POST /auth/signup
Content-Type: application/json

{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123!",
  "phone": "+1234567890",
  "gender": "male",
  "dob": "1995-01-15",
  "nationality": "American",
  "highest_qualifications": "Bachelor's Degree",
  "city": "New York",
  "sponsor_name": "Jane Doe",
  "sponsor_email": "jane.doe@example.com",
  "sponsor_phone": "+1234567891"
}
```

#### Course Creation
```http
POST /api/courses
Content-Type: multipart/form-data
Authorization: Bearer <admin_token>

{
  "title": "Introduction to Web Development",
  "description": "Learn the basics of HTML, CSS, and JavaScript",
  "price": 99.99,
  "category": "Programming",
  "creator": "Admin User",
  "image": <file>
}
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### API Testing
Use the provided HTTP files in `src/http/` directory:
- `auth.http` - Authentication endpoints
- `users.http` - User management endpoints

## 🔧 Development

### Scripts
```bash
npm run dev          # Start development server with nodemon
npm run build        # Build TypeScript to JavaScript
npm start            # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### Code Quality
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting and style enforcement
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks

## 🚀 Deployment

### Environment Variables
Ensure all production environment variables are set:
- Database credentials
- JWT secret key
- Cloudinary configuration
- NODE_ENV=production

### Build Process
```bash
npm run build
npm start
```

### Docker Support (Coming Soon)
Docker configuration for containerized deployment.

## 🔒 Security

### Implemented Security Measures
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Authentication Rate Limiting**: 5 login attempts per 15 minutes
- **Input Sanitization**: XSS and injection prevention
- **Password Security**: 12-round bcrypt hashing
- **JWT Security**: Secure token generation and validation
- **Environment Variables**: No hardcoded secrets
- **Security Headers**: Helmet.js protection
- **CORS Configuration**: Controlled cross-origin requests

### Security Best Practices
- Regularly update dependencies
- Use environment variables for secrets
- Implement proper error handling
- Log security events
- Regular security audits

## 📋 Database Schema

### Tables
- **admins**: Administrator user accounts
- **students**: Student user accounts with detailed profiles
- **courses**: Course information and metadata
- **topics**: Course content organized by topics

### Relationships
- **Courses ↔ Topics**: One-to-many relationship
- **Students**: Independent user management
- **Admins**: Administrative oversight

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Contribution Guidelines
- Follow TypeScript best practices
- Add tests for new features
- Update documentation
- Follow existing code style
- Write meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Fredrick Yalley** - *Initial work* - [yalleyfred](https://github.com/yalleyfred)

## 🙏 Acknowledgments

- Express.js community for the robust framework
- Sequelize team for the excellent ORM
- TypeScript team for type safety
- Security community for best practices
- Open source contributors

## 📞 Support

For support and questions:
- Email: yalleyfred@gmail.com
- GitHub Issues: [Create an issue](https://github.com/yalleyfred/open-v/issues)

## 📈 Roadmap

### Upcoming Features
- [ ] Real-time notifications
- [ ] Course progress tracking
- [ ] Payment integration
- [ ] Advanced analytics
- [ ] Mobile app support
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Comprehensive testing suite

---

**Made with ❤️ for educational excellence**