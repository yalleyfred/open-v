import { Model } from 'sequelize-typescript';
interface TopicI {
    id: number | null;
    heading: string;
    paragraph: string[];
    illustration: string;
    video: string;
    reference: string;
    course_id: number | null;
}
export default class Topic extends Model implements TopicI {
    id: number;
    heading: string;
    paragraph: Array<string>;
    illustration: string;
    video: string;
    reference: string;
    course_id: number;
}
export {};
