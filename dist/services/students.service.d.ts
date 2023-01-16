import { CreateStudentDto } from '../dtos/users.dto';
import { StudentInt } from '../interfaces/student.interface';
import Student from '../models/students.model';
declare class StudentService {
    users: typeof Student;
    findAllUser(): Promise<StudentInt[]>;
    findUserById(userId: number): Promise<StudentInt>;
    createUser(userData: CreateStudentDto): Promise<StudentInt>;
    updateUser(userId: number, userData: CreateStudentDto): Promise<StudentInt[]>;
    deleteUser(userId: number): Promise<StudentInt[]>;
}
export default StudentService;
