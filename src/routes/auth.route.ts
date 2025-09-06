import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { CreateStudentDto, LoginUserDto } from '../dtos/users.dto';
import { Routes } from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';
import { authLimiter } from '../middlewares/rateLimiter.middleware';

class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, authLimiter, validationMiddleware(CreateStudentDto, 'body'), this.authController.signUp);
    this.router.post(`${this.path}login`, authLimiter, validationMiddleware(LoginUserDto, 'body'), this.authController.logIn);
    this.router.post(`${this.path}logout`, authMiddleware, this.authController.logOut);
  }
}

export default AuthRoute;
