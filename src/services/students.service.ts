import { hash } from 'bcrypt';
import { CreateStudentDto } from '../dtos/users.dto';
import { HttpException } from '../exceptions/HttpException';
import { StudentInt, User } from '../interfaces/student.interface';
import Student from '../models/students.model';
import { isEmpty } from '../utils/util';

class StudentService {
  private users = Student;

  public async findAllUser(): Promise<StudentInt[]> {
    try {
      const users: StudentInt[] = await this.users.findAll({
        attributes: { exclude: ['password'] }
      });
      return users;
    } catch (error) {
      throw new HttpException(500, 'Error retrieving students');
    }
  }

  public async findUserById(userId: number): Promise<StudentInt> {
    try {
      if (!userId || isNaN(userId) || userId <= 0) {
        throw new HttpException(400, 'Invalid user ID');
      }

      const findUser: StudentInt = await this.users.findByPk(userId, {
        attributes: { exclude: ['password'] }
      });
      
      if (!findUser) {
        throw new HttpException(404, "Student doesn't exist");
      }
      
      return findUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(500, 'Error retrieving student');
    }
  }

  public async createUser(userData: CreateStudentDto): Promise<StudentInt> {
    try {
      if (isEmpty(userData)) {
        throw new HttpException(400, "Student data is empty");
      }

      // Check if user already exists
      const existingUser: StudentInt = await this.users.findOne({
        where: { email: userData.email }
      });
      
      if (existingUser) {
        throw new HttpException(409, `Student with email ${userData.email} already exists`);
      }

      // Hash password with increased salt rounds for security
      const hashedPassword = await hash(userData.password, 12);
      
      const createUserData = {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password: hashedPassword,
        gender: userData.gender,
        dob: userData.dob,
        nationality: userData.nationality,
        highest_qualifications: userData.highest_qualifications,
        phone: userData.phone,
        city: userData.city,
        sponsor_name: userData.sponsor_name,
        sponsor_email: userData.sponsor_email,
        sponsor_phone: userData.sponsor_phone
      };

      const createdUser = await this.users.create(createUserData);
      
      // Return user without password
      const { password, ...userWithoutPassword } = createdUser.toJSON();
      return userWithoutPassword as StudentInt;

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(500, 'Error creating student');
    }
  }

  public async updateUser(userId: number, userData: Partial<CreateStudentDto>): Promise<StudentInt> {
    try {
      if (!userId || isNaN(userId) || userId <= 0) {
        throw new HttpException(400, 'Invalid user ID');
      }

      if (isEmpty(userData)) {
        throw new HttpException(400, "Update data is empty");
      }

      // Check if user exists
      const existingUser = await this.users.findByPk(userId);
      if (!existingUser) {
        throw new HttpException(404, "Student doesn't exist");
      }

      // Check if email is being updated and already exists
      if (userData.email && userData.email !== existingUser.email) {
        const emailExists = await this.users.findOne({
          where: { email: userData.email }
        });
        if (emailExists) {
          throw new HttpException(409, `Email ${userData.email} already exists`);
        }
      }

      const updateData: any = { ...userData };
      
      // Hash password if provided
      if (userData.password) {
        updateData.password = await hash(userData.password, 12);
      }

      await this.users.update(updateData, {
        where: { id: userId }
      });

      // Return updated user without password
      const updatedUser = await this.users.findByPk(userId, {
        attributes: { exclude: ['password'] }
      });

      return updatedUser;

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(500, 'Error updating student');
    }
  }

  public async deleteUser(userId: number): Promise<{ message: string }> {
    try {
      if (!userId || isNaN(userId) || userId <= 0) {
        throw new HttpException(400, 'Invalid user ID');
      }

      const findUser = await this.users.findByPk(userId);
      if (!findUser) {
        throw new HttpException(404, "Student doesn't exist");
      }

      await this.users.destroy({
        where: { id: userId }
      });

      return { message: 'Student deleted successfully' };

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(500, 'Error deleting student');
    }
  }
}

export default StudentService;
