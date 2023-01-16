"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const HttpException_1 = require("../exceptions/HttpException");
const topics_model_1 = tslib_1.__importDefault(require("../models/topics.model"));
const course_model_1 = tslib_1.__importDefault(require("../models/course.model"));
// import {LocalDB} from '../Database'
const util_1 = require("../utils/util");
class TopicService {
    constructor() {
        this.topic = topics_model_1.default;
        this.course = course_model_1.default;
    }
    async findAllTopics() {
        // TopicMap(LocalDB);
        const topic = await this.topic.findAll();
        return topic;
    }
    async findTopicById(userId) {
        // TopicMap(LocalDB);
        const findUser = await this.topic.findOne({ where: { id: userId } });
        if (!findUser)
            throw new HttpException_1.HttpException(409, "User doesn't exist");
        return findUser;
    }
    async createTopic(userData) {
        // TopicMap(LocalDB);
        if ((0, util_1.isEmpty)(userData))
            throw new HttpException_1.HttpException(400, "CourseData is empty");
        const findCourse = await this.course.findOne({
            where: {
                title: userData.course_id,
            },
        });
        console.log(findCourse);
        if (!findCourse)
            throw new HttpException_1.HttpException(409, `This Course ${userData.course_id} does not exists`);
        let id = Number(findCourse.id);
        console.log(id);
        const findUser = await this.topic.findOne({
            where: {
                heading: userData.heading,
            },
        });
        if (findUser)
            throw new HttpException_1.HttpException(409, `This Topic ${userData.heading} already exists`);
        let result = {
            heading: userData.heading,
            paragraph: userData.paragraph,
            illustration: userData.illustration,
            video: userData.video,
            reference: userData.reference,
            course_id: id,
        };
        await this.topic.create(result);
        return result;
    }
    async updateTopic(userId, userData) {
        // TopicMap(LocalDB);
        if ((0, util_1.isEmpty)(userData))
            throw new HttpException_1.HttpException(400, "userData is empty");
        const findUser = await this.topic.findAll({ where: { id: userId } });
        if (!findUser)
            throw new HttpException_1.HttpException(409, "User doesn't exist");
        // const hashedPassword = await hash(userData.password, 10);
        const updateUserData = await findUser.map((user) => {
            // if (user.id === userId) user = { first_name: userData.first_name, last_name: userData.last_name, email: userData.email, password: hashedPassword, gender: userData.gender, dob: userData.dob, nationality: userData.nationality, highest_qualifications: userData.highest_qualifications, phone: userData.phone, city: userData.city, sponsor_name: userData.sponsor_name, sponsor_email: userData.sponsor_email, sponsor_phone: userData.sponsor_phone };
            return user;
        });
        return updateUserData;
    }
    async deleteTopic(userId) {
        // TopicMap(LocalDB)
        const findUser = await this.topic.findOne({ where: { id: userId } });
        if (!findUser)
            throw new HttpException_1.HttpException(409, "User doesn't exist");
        const deleteUserData = (await this.findAllTopics());
        // .filter(user => user.id !== findUser.id)
        return deleteUserData;
    }
}
exports.default = TopicService;
//# sourceMappingURL=topic.service.js.map