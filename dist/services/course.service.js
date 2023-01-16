"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const HttpException_1 = require("../exceptions/HttpException");
const course_model_1 = tslib_1.__importDefault(require("../models/course.model"));
// import {LocalDB} from '../Database'
const util_1 = require("../utils/util");
const topics_model_1 = tslib_1.__importDefault(require("../models/topics.model"));
class CourseService {
    constructor() {
        this.course = course_model_1.default;
    }
    async findAllCoursesContent(userId) {
        // CourseMap(LocalDB);
        const course = await this.course.findAll({
            include: [{
                    model: topics_model_1.default,
                    as: 'topics'
                }],
            where: {
                id: userId
            }
        });
        return course;
    }
    async findAllCourses() {
        // CourseMap(LocalDB);
        const course = await this.course.findAll();
        return course;
    }
    async findCourseById(userId) {
        // CourseMap(LocalDB);
        const findUser = await this.course.findOne({ where: { id: userId } });
        if (!findUser)
            throw new HttpException_1.HttpException(409, "User doesn't exist");
        console.log(findUser);
        return findUser;
    }
    async createCourse(userData) {
        // CourseMap(LocalDB);
        console.log(userData);
        if ((0, util_1.isEmpty)(userData))
            throw new HttpException_1.HttpException(400, "CourseData is empty");
        const findUser = await this.course.findOne({
            where: {
                title: userData.title,
            },
        });
        if (findUser)
            throw new HttpException_1.HttpException(409, `This Course ${userData.title} already exists`);
        return userData;
    }
    async updateCourse(userId, userData) {
        // CourseMap(LocalDB);
        if ((0, util_1.isEmpty)(userData))
            throw new HttpException_1.HttpException(400, "userData is empty");
        const findUser = await this.course.findAll({ where: { id: userId } });
        if (!findUser)
            throw new HttpException_1.HttpException(409, "User doesn't exist");
        // const hashedPassword = await hash(userData.password, 10);
        const updateUserData = await findUser.map((user) => {
            // if (user.id === userId) user = { first_name: userData.first_name, last_name: userData.last_name, email: userData.email, password: hashedPassword, gender: userData.gender, dob: userData.dob, nationality: userData.nationality, highest_qualifications: userData.highest_qualifications, phone: userData.phone, city: userData.city, sponsor_name: userData.sponsor_name, sponsor_email: userData.sponsor_email, sponsor_phone: userData.sponsor_phone };
            return user;
        });
        return updateUserData;
    }
    async deleteCourse(userId) {
        // CourseMap(LocalDB)
        const findUser = await this.course.findOne({ where: { id: userId } });
        if (!findUser)
            throw new HttpException_1.HttpException(409, "User doesn't exist");
        const deleteUserData = (await this.findAllCourses());
        // .filter(user => user.id !== findUser.id)
        return deleteUserData;
    }
}
exports.default = CourseService;
//# sourceMappingURL=course.service.js.map