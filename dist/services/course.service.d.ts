import { CreateCourseDto } from '../dtos/course.dto';
import { Course } from '../interfaces/course.interface';
import { Cou } from '../interfaces/course.interface';
import Courses from '../models/course.model';
declare class CourseService {
    course: typeof Courses;
    findAllCoursesContent(userId: number): Promise<Course[]>;
    findAllCourses(): Promise<Course[]>;
    findCourseById(userId: number): Promise<Course>;
    createCourse(userData: CreateCourseDto): Promise<Cou>;
    updateCourse(userId: number, userData: CreateCourseDto): Promise<Course[]>;
    deleteCourse(userId: number): Promise<Course[]>;
}
export default CourseService;
