"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const topic_Controller_1 = tslib_1.__importDefault(require("../controllers/topic.Controller"));
const topic_dto_1 = require("../dtos/topic.dto");
const validation_middleware_1 = tslib_1.__importDefault(require("../middlewares/validation.middleware"));
class TopicRoute {
    constructor() {
        this.path = '/api/topics/';
        this.router = (0, express_1.Router)();
        this.TopicController = new topic_Controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.TopicController.getTopics);
        this.router.get(`${this.path}/:id(\\d+)`, this.TopicController.getTopicById);
        this.router.post(`${this.path}`, (0, validation_middleware_1.default)(topic_dto_1.CreateTopicDto, 'body'), this.TopicController.createCourse);
        this.router.put(`${this.path}/:id(\\d+)`, (0, validation_middleware_1.default)(topic_dto_1.CreateTopicDto, 'body', true), this.TopicController.updateCourse);
        this.router.delete(`${this.path}/:id(\\d+)`, this.TopicController.deleteCourse);
    }
}
exports.default = TopicRoute;
//# sourceMappingURL=topics.route.js.map