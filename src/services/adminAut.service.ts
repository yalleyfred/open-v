import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '../config';
import { CreateUserDto, LoginUserDto } from '../dtos/users.dto';
import { HttpException } from '../exceptions/HttpException';
import { DataStoredInToken, TokenData } from '../interfaces/auth.interface';
import { User } from '../interfaces/admin.interface';
import Admins from '../models/admins.model';
import { isEmpty } from '../utils/util';

class AdminAuthService {
  private users = Admins;

  public async findAllUser(): Promise<Omit<User, 'password'>[]> {
    try {
      const users: User[] = await this.users.findAll({
        attributes: { exclude: ['password'] }
      });
      return users;
    } catch (error) {
      throw new HttpException(500, 'Error retrieving admins');
    }
  }

  public async signup(userData: CreateUserDto): Promise<Omit<User, 'password'>> {
    try {
      if (isEmpty(userData)) {
        throw new HttpException(400, "User data is empty");
      }

      // Check if admin already exists
      const existingUser: any = await this.users.findOne({
        where: { email: userData.email }
      });
      
      if (existingUser) {
        throw new HttpException(409, `Admin with email ${userData.email} already exists`);
      }

      // Hash password with increased salt rounds for security
      const hashedPassword = await hash(userData.password, 12);
      
      const createUserData = {
        name: userData.name,
        email: userData.email,
        password: hashedPassword
      };

      const createdUser: any = await this.users.create(createUserData);
      
      // Return user without password
      const { password, ...userWithoutPassword } = createdUser.dataValues || createdUser;
      return userWithoutPassword;

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(500, 'Error creating admin');
    }
  }

  public async login(userData: LoginUserDto): Promise<{ 
    cookie: string; 
    findUser: Omit<User, 'password'>;
    token: string;
  }> {
    try {
      if (isEmpty(userData)) {
        throw new HttpException(400, "Login data is empty");
      }

      if (!userData.email || !userData.password) {
        throw new HttpException(400, "Email and password are required");
      }

      const findUser: any = await this.users.findOne({
        where: { email: userData.email }
      });

      if (!findUser) {
        throw new HttpException(401, "Invalid email or password");
      }

      const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
      if (!isPasswordMatching) {
        throw new HttpException(401, "Invalid email or password");
      }

      const tokenData = this.createToken({ id: findUser.id });
      const cookie = this.createCookie(tokenData);

      // Return user without password
      const { password, ...userWithoutPassword } = findUser.dataValues || findUser;
      
      return { 
        cookie, 
        findUser: userWithoutPassword,
        token: tokenData.token
      };

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(500, 'Error during login');
    }
  }

  public async logout(userData: { email: string }): Promise<{ message: string }> {
    try {
      if (isEmpty(userData) || !userData.email) {
        throw new HttpException(400, "Email is required for logout");
      }

      const findUser: User = await this.users.findOne({
        where: { email: userData.email }
      });
      
      if (!findUser) {
        throw new HttpException(404, "Admin not found");
      }

      // In a real application, you might want to blacklist the token
      // or store logout information for audit purposes
      return { message: 'Successfully logged out' };

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(500, 'Error during logout');
    }
  }

  public async findUserById(userId: number): Promise<Omit<User, 'password'>> {
    try {
      if (!userId || isNaN(userId) || userId <= 0) {
        throw new HttpException(400, 'Invalid user ID');
      }

      const findUser: User = await this.users.findByPk(userId, {
        attributes: { exclude: ['password'] }
      });
      
      if (!findUser) {
        throw new HttpException(404, "Admin doesn't exist");
      }
      
      return findUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(500, 'Error retrieving admin');
    }
  }

  public async updateAdmin(userId: number, userData: Partial<CreateUserDto>): Promise<Omit<User, 'password'>> {
    try {
      if (!userId || isNaN(userId) || userId <= 0) {
        throw new HttpException(400, 'Invalid user ID');
      }

      if (isEmpty(userData)) {
        throw new HttpException(400, "Update data is empty");
      }

      // Check if admin exists
      const existingUser = await this.users.findByPk(userId);
      if (!existingUser) {
        throw new HttpException(404, "Admin doesn't exist");
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

      // Return updated admin without password
      const updatedUser = await this.users.findByPk(userId, {
        attributes: { exclude: ['password'] }
      });

      return updatedUser;

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(500, 'Error updating admin');
    }
  }

  public async deleteAdmin(userId: number): Promise<{ message: string }> {
    try {
      if (!userId || isNaN(userId) || userId <= 0) {
        throw new HttpException(400, 'Invalid user ID');
      }

      const findUser = await this.users.findByPk(userId);
      if (!findUser) {
        throw new HttpException(404, "Admin doesn't exist");
      }

      await this.users.destroy({
        where: { id: userId }
      });

      return { message: 'Admin deleted successfully' };

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(500, 'Error deleting admin');
    }
  }

  private createToken(user: { id: number }): TokenData {
    try {
      const dataStoredInToken: DataStoredInToken = { id: user.id };
      const secretKey: string = SECRET_KEY;
      const expiresIn: number = 60 * 60 * 24; // 24 hours instead of 1 hour

      if (!secretKey) {
        throw new HttpException(500, 'JWT secret key not configured');
      }

      const token = sign(dataStoredInToken, secretKey, { 
        expiresIn,
        issuer: 'open-v-api',
        audience: 'open-v-client'
      });

      return { expiresIn, token };
    } catch (error) {
      throw new HttpException(500, 'Error creating authentication token');
    }
  }

  private createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Secure; SameSite=Strict; Max-Age=${tokenData.expiresIn}; Path=/`;
  }
}

export default AdminAuthService;
