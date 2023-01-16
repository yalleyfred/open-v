import { Model } from 'sequelize-typescript';
interface StudentI {
    id: number | null;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    gender: string;
    dob: string;
    nationality: string;
    highest_qualifications: string;
    phone: string;
    city: string;
    sponsor_name: string;
    sponsor_email: string;
    sponsor_phone: string;
}
export default class Student extends Model implements StudentI {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    gender: string;
    dob: string;
    nationality: string;
    highest_qualifications: string;
    phone: string;
    city: string;
    sponsor_name: string;
    sponsor_email: string;
    sponsor_phone: string;
}
export {};
