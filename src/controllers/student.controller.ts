import { NextFunction, Request, Response } from 'express';
import { CreateStudentDto } from '../dtos/users.dto';
import { StudentInt } from '../interfaces/student.interface';
import StudentService from '../services/students.service';

class StudentController {
  public studentService = new StudentService();

  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllUsersData: StudentInt[] = await this.studentService.findAllUser();
      res.status(200).json({ data: findAllUsersData, message: 'Students retrieved successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const findOneUserData: StudentInt = await this.studentService.findUserById(userId);
      res.status(200).json({ data: findOneUserData, message: 'Student retrieved successfully' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateStudentDto = req.body;
      const createUserData: StudentInt = await this.studentService.createUser(userData);
      res.status(201).json({ data: createUserData, message: 'Student created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const userData: Partial<CreateStudentDto> = req.body;
      const updateUserData: StudentInt = await this.studentService.updateUser(userId, userData);
      res.status(200).json({ data: updateUserData, message: 'Student updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);
      const deleteUserData = await this.studentService.deleteUser(userId);
      res.status(200).json({ data: deleteUserData, message: 'Student deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default StudentController;
