import { NextFunction, Response } from 'express';
import { RequestWithUser, RequestWithStudent } from '../interfaces/auth.interface';
declare const authMiddleware: (req: RequestWithUser | RequestWithStudent, res: Response, next: NextFunction) => Promise<void>;
export default authMiddleware;
