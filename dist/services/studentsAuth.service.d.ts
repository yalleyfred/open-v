import { CreateStudentDto, LoginUserDto } from '../dtos/users.dto';
import { TokenData } from '../interfaces/auth.interface';
import { StudentInt } from '../interfaces/student.interface';
import Students from '../models/students.model';
declare class StudentAuthService {
    users: typeof Students;
    signup(userData: CreateStudentDto): Promise<StudentInt>;
    login(userData: LoginUserDto): Promise<{
        cookie: string;
        findUser: StudentInt;
    }>;
    logout(userData: StudentInt): Promise<StudentInt>;
    createToken(user: {
        id: number;
    }): TokenData;
    createCookie(tokenData: TokenData): string;
}
export default StudentAuthService;
