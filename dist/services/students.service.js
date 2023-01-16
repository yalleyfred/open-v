"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bcrypt_1 = require("bcrypt");
const HttpException_1 = require("../exceptions/HttpException");
const students_model_1 = tslib_1.__importDefault(require("../models/students.model"));
// import {LocalDB} from '../Database'
const util_1 = require("../utils/util");
class StudentService {
    constructor() {
        this.users = students_model_1.default;
    }
    async findAllUser() {
        // AdminMap(LocalDB);
        const users = await this.users.findAll();
        return users;
    }
    async findUserById(userId) {
        // AdminMap(LocalDB);
        const findUser = await this.users.findOne({ where: { id: userId } });
        if (!findUser)
            throw new HttpException_1.HttpException(409, "User doesn't exist");
        console.log(findUser);
        return findUser;
    }
    async createUser(userData) {
        // AdminMap(LocalDB);
        if ((0, util_1.isEmpty)(userData))
            throw new HttpException_1.HttpException(400, "userData is empty");
        const findUser = await this.users.findOne({
            where: {
                email: userData.email,
            },
        });
        if (findUser)
            throw new HttpException_1.HttpException(409, `This email ${userData.email} already exists`);
        const hashedPassword = await (0, bcrypt_1.hash)(userData.password, 10);
        const createUserData = { first_name: userData.first_name, last_name: userData.last_name, email: userData.email, password: hashedPassword, gender: userData.gender, dob: userData.dob, nationality: userData.nationality, highest_qualifications: userData.highest_qualifications, phone: userData.phone, city: userData.city, sponsor_name: userData.sponsor_name, sponsor_email: userData.sponsor_email, sponsor_phone: userData.sponsor_phone };
        await this.users.create(createUserData);
        return createUserData;
    }
    async updateUser(userId, userData) {
        // AdminMap(LocalDB);
        if ((0, util_1.isEmpty)(userData))
            throw new HttpException_1.HttpException(400, "userData is empty");
        const findUser = await this.users.findAll({ where: { id: userId } });
        if (!findUser)
            throw new HttpException_1.HttpException(409, "User doesn't exist");
        const hashedPassword = await (0, bcrypt_1.hash)(userData.password, 10);
        const updateUserData = await findUser.map((user) => {
            // if (user.id === userId) user = { first_name: userData.first_name, last_name: userData.last_name, email: userData.email, password: hashedPassword, gender: userData.gender, dob: userData.dob, nationality: userData.nationality, highest_qualifications: userData.highest_qualifications, phone: userData.phone, city: userData.city, sponsor_name: userData.sponsor_name, sponsor_email: userData.sponsor_email, sponsor_phone: userData.sponsor_phone };
            return user;
        });
        return updateUserData;
    }
    async deleteUser(userId) {
        // AdminMap(LocalDB)
        const findUser = await this.users.findOne({ where: { id: userId } });
        if (!findUser)
            throw new HttpException_1.HttpException(409, "User doesn't exist");
        const deleteUserData = (await this.findAllUser());
        // .filter(user => user.id !== findUser.id)
        return deleteUserData;
    }
}
exports.default = StudentService;
//# sourceMappingURL=students.service.js.map