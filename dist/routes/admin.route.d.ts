import AuthController from '../controllers/adminAuth.controller';
import StudentController from '../controllers/student.controller';
import { Routes } from '../interfaces/routes.interface';
declare class AdminAuthRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    authController: AuthController;
    studentController: StudentController;
    constructor();
    private initializeRoutes;
}
export default AdminAuthRoute;
