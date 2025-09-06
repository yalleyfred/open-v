import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '../config';
import { CreateStudentDto, LoginUserDto } from '../dtos/users.dto';
import { HttpException } from '../exceptions/HttpException';
import { DataStoredInToken, TokenData } from '../interfaces/auth.interface';
import { StudentInt } from '../interfaces/student.interface';
import Students from '../models/students.model';
import { isEmpty } from '../utils/util';
import { logger } from '../utils/logger';

class StudentAuthService {
  public users = Students;

  public async signup(userData: CreateStudentDto): Promise<Omit<StudentInt, 'password'>> {
    try {
      if (isEmpty(userData)) {
        throw new HttpException(400, "User data is empty");
      }

      // Check if user already exists
      const existingUser: StudentInt = await this.users.findOne({
        where: {
          email: userData.email,
        },
      });
      
      if (existingUser) {
        throw new HttpException(409, `Email ${userData.email} is already registered`);
      }

      // Hash password
      const hashedPassword = await hash(userData.password, 12); // Increased salt rounds for better security

      // Create user data object
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
        sponsor_phone: userData.sponsor_phone,
      };

      // Create user in database
      const newUser = await this.users.create(createUserData);

      // Return user data without password
      const { password, ...userWithoutPassword } = newUser.toJSON();
      return userWithoutPassword;

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      logger.error('Error during student signup:', error);
      throw new HttpException(500, 'Failed to create student account');
    }
  }

  public async login(userData: LoginUserDto): Promise<{ cookie: string; user: Omit<StudentInt, 'password'> }> {
    try {
      if (isEmpty(userData)) {
        throw new HttpException(400, "Login data is empty");
      }

      // Find user by email
      const findUser = await this.users.findOne({
        where: {
          email: userData.email,
        },
      });
      
      if (!findUser) {
        throw new HttpException(401, "Invalid email or password");
      }

      // Verify password
      const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
      if (!isPasswordMatching) {
        throw new HttpException(401, "Invalid email or password");
      }

      // Generate token and cookie
      const tokenData = this.createToken(findUser);
      const cookie = this.createCookie(tokenData);
      
      // Return user data without password
      const { password, ...userWithoutPassword } = findUser.toJSON();
      
      return { cookie, user: userWithoutPassword };

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      logger.error('Error during student login:', error);
      throw new HttpException(500, 'Login failed');
    }
  }

  public async logout(userData: StudentInt): Promise<{ message: string }> {
    try {
      if (isEmpty(userData)) {
        throw new HttpException(400, "User data is empty");
      }

      // Verify user exists (optional - for security)
      const findUser = await this.users.findOne({
        where: {
          email: userData.email,
        },
      });
      
      if (!findUser) {
        throw new HttpException(404, "User not found");
      }

      // In a real application, you might want to:
      // 1. Add token to blacklist
      // 2. Update last_logout timestamp
      // 3. Log the logout event

      return { message: "Logged out successfully" };

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      logger.error('Error during student logout:', error);
      throw new HttpException(500, 'Logout failed');
    }
  }

  public createToken(user: { id: number }): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60 * 24; // 24 hours

    return { 
      expiresIn, 
      token: sign(dataStoredInToken, secretKey, { expiresIn: `${expiresIn}s` }) 
    };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Secure; SameSite=Strict; Max-Age=${tokenData.expiresIn}; Path=/`;
  }
}

export default StudentAuthService;
