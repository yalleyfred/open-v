import { Router } from 'express';
import AuthController from '../controllers/adminAuth.controller';
import StudentController from '../controllers/student.controller';
import { CreateUserDto, LoginUserDto, CreateStudentDto } from '../dtos/users.dto';
import { Routes } from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';
import { authLimiter } from '../middlewares/rateLimiter.middleware';

class AdminAuthRoute implements Routes {
    public path = '/admin/';
    public router = Router();
    public authController = new AuthController();
    public studentController = new StudentController();
  
    constructor() {
      this.initializeRoutes();
    }
  
    private initializeRoutes() {
      // Student management routes
      this.router.get(`${this.path}students`, authMiddleware, this.studentController.getUsers);
      this.router.get(`${this.path}students/:id(\\d+)`, authMiddleware, this.studentController.getUserById);
      this.router.post(`${this.path}students`, authMiddleware, validationMiddleware(CreateStudentDto, 'body'), this.studentController.createUser);
      this.router.put(`${this.path}students/:id(\\d+)`, authMiddleware, validationMiddleware(CreateStudentDto, 'body', true), this.studentController.updateUser);
      this.router.delete(`${this.path}students/:id(\\d+)`, authMiddleware, this.studentController.deleteUser);

      // Admin management routes
      this.router.get(`${this.path}`, authMiddleware, this.authController.getUsers);
      this.router.get(`${this.path}:id(\\d+)`, authMiddleware, this.authController.getUserById);
      this.router.put(`${this.path}:id(\\d+)`, authMiddleware, validationMiddleware(CreateUserDto, 'body', true), this.authController.updateAdmin);
      this.router.delete(`${this.path}:id(\\d+)`, authMiddleware, this.authController.deleteAdmin);
      
      // Auth routes
      this.router.post(`${this.path}signup`, authLimiter, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
      this.router.post(`${this.path}login`, authLimiter, validationMiddleware(LoginUserDto, 'body'), this.authController.logIn);
      this.router.post(`${this.path}logout`, authMiddleware, this.authController.logOut);
    }
  }
  
  export default AdminAuthRoute;