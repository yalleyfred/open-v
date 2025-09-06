import { NextFunction, Request, Response } from 'express';
import { CreateCourseDto, UpdateCourseDto } from '../dtos/course.dto';
import { Course } from '../interfaces/course.interface';
import CourseService from '../services/course.service';
import cloudinary from '../utils/cloudinary';

class CourseController {
  public courseService = new CourseService();
  public getCoursesContent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const findAllUsersData: Course[] = await this.courseService.findAllCoursesContent(userId);
      

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCourses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllUsersData: Course[] = await this.courseService.findAllCourses();
      

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCourseById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const findOneUserData: Course = await this.courseService.findCourseById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateCourseDto = req.body;
      
      if (!req.file) {
        // File upload is required for course creation
        res.status(400).json({ message: 'Course image is required' });
        return;
      }

      // Upload image to cloudinary
      const results = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "open-varsity",
        resource_type: "image"
      });

      // Create course data with image
      const courseData = {
        ...userData,
        image_url: results.secure_url,
        image_id: results.public_id,
      };

      const createCourseData: Course = await this.courseService.createCourse(courseData);
      res.status(201).json({ data: createCourseData, message: 'Course created successfully' });
    } catch (error) {    
      next(error);
    }
  };

  public updateCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const userData: UpdateCourseDto = req.body;
      const updateUserData: Course = await this.courseService.updateCourse(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'Course updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteCourse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const deleteUserData = await this.courseService.deleteCourse(userId);

      res.status(200).json({ data: deleteUserData, message: 'Course deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default CourseController;
