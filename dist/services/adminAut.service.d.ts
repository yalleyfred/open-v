import { CreateUserDto, LoginUserDto } from '../dtos/users.dto';
import { TokenData } from '../interfaces/auth.interface';
import { User } from '../interfaces/admin.interface';
import Admins from '../models/admins.model';
declare class AdminAuthService {
    users: typeof Admins;
    findAllUser(): Promise<User[]>;
    signup(userData: CreateUserDto): Promise<User>;
    login(userData: LoginUserDto): Promise<{
        cookie: string;
        findUser: User;
    }>;
    logout(userData: User): Promise<User>;
    createToken(user: {
        id: number;
    }): TokenData;
    createCookie(tokenData: TokenData): string;
}
export default AdminAuthService;
