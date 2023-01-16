import CourseController from '../controllers/course.controller';
import { Routes } from '../interfaces/routes.interface';
declare class CourseRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    CourseController: CourseController;
    constructor();
    private initializeRoutes;
}
export default CourseRoute;
