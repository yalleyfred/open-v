import { Model } from 'sequelize-typescript';
interface AdminI {
    id: number | null;
    name: string;
    email: string;
    password: string;
    passwordResetToken: string;
    passwordResetExpires: Date;
    active: Boolean;
}
export default class Admin extends Model implements AdminI {
    id: number;
    name: string;
    email: string;
    password: string;
    passwordResetExpires: Date;
    passwordResetToken: string;
    active: boolean;
}
export {};
