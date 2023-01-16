"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
const HttpException_1 = require("../exceptions/HttpException");
const admins_model_1 = tslib_1.__importDefault(require("../models/admins.model"));
// import {LocalDB} from '../Database'
const util_1 = require("../utils/util");
class AdminAuthService {
    constructor() {
        this.users = admins_model_1.default;
    }
    async findAllUser() {
        // AdminMap(LocalDB);
        const users = await this.users.findAll();
        return users;
    }
    async signup(userData) {
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
        const createUserData = { name: userData.name, email: userData.email, password: hashedPassword };
        await this.users.create(createUserData);
        return createUserData;
    }
    async login(userData) {
        // AdminMap(LocalDB);
        if ((0, util_1.isEmpty)(userData))
            throw new HttpException_1.HttpException(400, "userData is empty");
        const findUser = await this.users.findOne({
            where: {
                email: userData.email,
            },
        });
        if (!findUser)
            throw new HttpException_1.HttpException(409, `This email ${userData.email} was not found`);
        const isPasswordMatching = await (0, bcrypt_1.compare)(userData.password, findUser.password);
        if (!isPasswordMatching)
            throw new HttpException_1.HttpException(409, "You're password not matching");
        const tokenData = this.createToken(findUser);
        const cookie = this.createCookie(tokenData);
        return { cookie, findUser };
    }
    async logout(userData) {
        // AdminMap(LocalDB);
        if ((0, util_1.isEmpty)(userData))
            throw new HttpException_1.HttpException(400, "userData is empty");
        const findUser = await this.users.findOne({
            where: {
                email: userData.email,
                password: userData.password
            },
        });
        if (!findUser)
            throw new HttpException_1.HttpException(409, "User doesn't exist");
        return findUser;
    }
    createToken(user) {
        const dataStoredInToken = { id: user.id };
        const secretKey = config_1.SECRET_KEY;
        const expiresIn = 60 * 60;
        return { expiresIn, token: (0, jsonwebtoken_1.sign)(dataStoredInToken, secretKey, { expiresIn }) };
    }
    createCookie(tokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
    }
}
exports.default = AdminAuthService;
//# sourceMappingURL=adminAut.service.js.map