import { NextFunction, Request, Response } from 'express';
import { RequestWithStudent } from '../interfaces/auth.interface';
import AuthService from '../services/studentsAuth.service';
declare class AuthController {
    authService: AuthService;
    signUp: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    logIn: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    logOut: (req: RequestWithStudent, res: Response, next: NextFunction) => Promise<void>;
}
export default AuthController;
