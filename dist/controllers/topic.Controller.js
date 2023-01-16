"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const topic_service_1 = tslib_1.__importDefault(require("../services/topic.service"));
class TopicController {
    constructor() {
        this.topicService = new topic_service_1.default();
        this.getTopics = async (req, res, next) => {
            try {
                const findAllUsersData = await this.topicService.findAllTopics();
                res.status(200).json({ data: findAllUsersData, message: 'findAll' });
            }
            catch (error) {
                next(error);
            }
        };
        this.getTopicById = async (req, res, next) => {
            try {
                const userId = Number(req.params.id);
                const findOneUserData = await this.topicService.findTopicById(userId);
                res.status(200).json({ data: findOneUserData, message: 'findOne' });
            }
            catch (error) {
                next(error);
            }
        };
        this.createCourse = async (req, res, next) => {
            try {
                const userData = req.body;
                // console.log(userData);
                const createUserData = await this.topicService.createTopic(userData);
                res.status(201).json({ data: createUserData, message: 'created' });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateCourse = async (req, res, next) => {
            try {
                const userId = Number(req.params.id);
                const userData = req.body;
                const updateUserData = await this.topicService.updateTopic(userId, userData);
                res.status(200).json({ data: updateUserData, message: 'updated' });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteCourse = async (req, res, next) => {
            try {
                const userId = Number(req.params.id);
                const deleteUserData = await this.topicService.deleteTopic(userId);
                res.status(200).json({ data: deleteUserData, message: 'deleted' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = TopicController;
//# sourceMappingURL=topic.Controller.js.map