import { CreateCourseDto, UpdateCourseDto } from '../dtos/course.dto';
import { HttpException } from '../exceptions/HttpException';
import { Course } from '../interfaces/course.interface';
import Courses from '../models/course.model';
import { isEmpty } from '../utils/util';
import Topics from '../models/topics.model';
import { logger } from '../utils/logger';

class CourseService {
  public course = Courses;

  public async findAllCoursesContent(courseId: number): Promise<Course[]> {
    try {
      const courses: Course[] = await this.course.findAll({
        include: [{
          model: Topics,
          as: 'topics'
        }],
        where: {
          id: courseId
        }
      });
      return courses;
    } catch (error) {
      logger.error('Error finding courses with content:', error);
      throw new HttpException(500, 'Failed to retrieve courses with content');
    }
  }

  public async findAllCourses(): Promise<Course[]> {
    try {
      const courses: Course[] = await this.course.findAll({
        order: [['createdAt', 'DESC']]
      });
      return courses;
    } catch (error) {
      logger.error('Error finding all courses:', error);
      throw new HttpException(500, 'Failed to retrieve courses');
    }
  }

  public async findCourseById(courseId: number): Promise<Course> {
    try {
      const course: Course = await this.course.findByPk(courseId, {
        include: [{
          model: Topics,
          as: 'topics'
        }]
      });
      
      if (!course) {
        throw new HttpException(404, `Course with ID ${courseId} not found`);
      }
      
      return course;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      logger.error('Error finding course by ID:', error);
      throw new HttpException(500, 'Failed to retrieve course');
    }
  }

  public async createCourse(userData: CreateCourseDto): Promise<Course> {
    try {
      if (isEmpty(userData)) {
        throw new HttpException(400, "Course data is empty");
      }

      // Check if course with same title already exists
      const existingCourse: Course = await this.course.findOne({
        where: {
          title: userData.title,
        },
      });
      
      if (existingCourse) {
        throw new HttpException(409, `Course with title "${userData.title}" already exists`);
      }

      // Create the course in database
      const newCourse: Course = await this.course.create({
        title: userData.title,
        image_url: userData.image_url || '',
        image_id: userData.image_id || '',
        category: userData.category,
        price: userData.price,
        creator: userData.creator
      });

      return newCourse;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      logger.error('Error creating course:', error);
      throw new HttpException(500, 'Failed to create course');
    }
  }

  public async updateCourse(courseId: number, userData: UpdateCourseDto): Promise<Course> {
    try {
      if (isEmpty(userData)) {
        throw new HttpException(400, "Update data is empty");
      }

      // Check if course exists
      const existingCourse: Course = await this.course.findByPk(courseId);
      if (!existingCourse) {
        throw new HttpException(404, `Course with ID ${courseId} not found`);
      }

      // If title is being updated, check for duplicates
      if (userData.title && userData.title !== existingCourse.title) {
        const duplicateCourse = await this.course.findOne({
          where: {
            title: userData.title,
            id: { [require('sequelize').Op.ne]: courseId }
          }
        });
        
        if (duplicateCourse) {
          throw new HttpException(409, `Course with title "${userData.title}" already exists`);
        }
      }

      // Update the course
      await this.course.update(userData, {
        where: { id: courseId }
      });

      // Return updated course
      const updatedCourse: Course = await this.findCourseById(courseId);
      return updatedCourse;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      logger.error('Error updating course:', error);
      throw new HttpException(500, 'Failed to update course');
    }
  }

  public async deleteCourse(courseId: number): Promise<{ message: string; deletedCourse: Course }> {
    try {
      // Check if course exists
      const courseToDelete: Course = await this.course.findByPk(courseId);
      if (!courseToDelete) {
        throw new HttpException(404, `Course with ID ${courseId} not found`);
      }

      // Delete associated topics first (if cascade delete is not set up)
      await Topics.destroy({
        where: { course_id: courseId }
      });

      // Delete the course
      await this.course.destroy({
        where: { id: courseId }
      });

      return {
        message: `Course "${courseToDelete.title}" deleted successfully`,
        deletedCourse: courseToDelete
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      logger.error('Error deleting course:', error);
      throw new HttpException(500, 'Failed to delete course');
    }
  }
}

export default CourseService;
