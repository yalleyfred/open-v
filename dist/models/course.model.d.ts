import { Model } from 'sequelize-typescript';
interface CourseI {
    id: number | null;
    title: string;
    image_url: string;
    image_id: string;
    category: string;
    price: number;
    creator: string;
}
export default class Course extends Model implements CourseI {
    id: number;
    title: string;
    image_url: string;
    image_id: string;
    category: string;
    price: number;
    creator: string;
}
export {};
