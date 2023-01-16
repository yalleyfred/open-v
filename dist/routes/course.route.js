"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const course_controller_1 = tslib_1.__importDefault(require("../controllers/course.controller"));
const course_dto_1 = require("../dtos/course.dto");
const validation_middleware_1 = tslib_1.__importDefault(require("../middlewares/validation.middleware"));
const multer_1 = tslib_1.__importDefault(require("../utils/multer"));
class CourseRoute {
    constructor() {
        this.path = '/api/course/';
        this.router = (0, express_1.Router)();
        this.CourseController = new course_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}content/:id`, this.CourseController.getCoursesContent);
        this.router.get(`${this.path}`, this.CourseController.getCourses);
        this.router.get(`${this.path}/:id(\\d+)`, this.CourseController.getCourseById);
        this.router.post(`${this.path}`, multer_1.default.single('file'), this.CourseController.createCourse);
        this.router.put(`${this.path}/:id(\\d+)`, (0, validation_middleware_1.default)(course_dto_1.CreateCourseDto, 'body', true), this.CourseController.updateCourse);
        this.router.delete(`${this.path}/:id(\\d+)`, this.CourseController.deleteCourse);
    }
}
exports.default = CourseRoute;
//# sourceMappingURL=course.route.js.map