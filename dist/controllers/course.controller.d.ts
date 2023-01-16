import { NextFunction, Request, Response } from 'express';
import CourseService from '../services/course.service';
import Courses from '../models/course.model';
declare class CourseController {
    courseService: CourseService;
    course: typeof Courses;
    getCoursesContent: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getCourses: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getCourseById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createCourse: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateCourse: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteCourse: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default CourseController;
