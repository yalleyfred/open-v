"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const course_service_1 = tslib_1.__importDefault(require("../services/course.service"));
const course_model_1 = tslib_1.__importDefault(require("../models/course.model"));
const cloudinary_1 = tslib_1.__importDefault(require("cloudinary"));
cloudinary_1.default.v2.config({
    cloud_name: 'dc9l6nzid',
    api_key: '655885314288553',
    api_secret: 'qd3DvsEHOwu4aw7hTRCiNxZJEs8'
});
class CourseController {
    constructor() {
        this.courseService = new course_service_1.default();
        this.course = course_model_1.default;
        this.getCoursesContent = async (req, res, next) => {
            try {
                const userId = Number(req.params.id);
                const findAllUsersData = await this.courseService.findAllCoursesContent(userId);
                res.status(200).json({ data: findAllUsersData, message: 'findAll' });
            }
            catch (error) {
                next(error);
            }
        };
        this.getCourses = async (req, res, next) => {
            try {
                const findAllUsersData = await this.courseService.findAllCourses();
                res.status(200).json({ data: findAllUsersData, message: 'findAll' });
            }
            catch (error) {
                next(error);
            }
        };
        this.getCourseById = async (req, res, next) => {
            try {
                const userId = Number(req.params.id);
                const findOneUserData = await this.courseService.findCourseById(userId);
                res.status(200).json({ data: findOneUserData, message: 'findOne' });
            }
            catch (error) {
                next(error);
            }
        };
        this.createCourse = async (req, res, next) => {
            try {
                const userData = req.body;
                const createUserData = await this.courseService.createCourse(userData);
                if (!req.file) {
                    console.log("No file received");
                    //  res.send({
                    //   success: false
                    // });
                }
                else {
                    console.log('file received');
                    //  res.send({
                    //   success: true
                    // })
                }
                const results = await cloudinary_1.default.v2.uploader.upload(req.file.path, {
                    folder: "image",
                    resource_type: "image"
                });
                let result = {
                    title: userData.title,
                    price: userData.price,
                    image_url: results.secure_url,
                    image_id: results.public_id,
                    category: userData.category,
                    creator: userData.creator,
                };
                await this.course.create(result);
                res.status(201).json({ data: result, message: 'created' });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateCourse = async (req, res, next) => {
            try {
                const userId = Number(req.params.id);
                const userData = req.body;
                const updateUserData = await this.courseService.updateCourse(userId, userData);
                res.status(200).json({ data: updateUserData, message: 'updated' });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteCourse = async (req, res, next) => {
            try {
                const userId = Number(req.params.id);
                const deleteUserData = await this.courseService.deleteCourse(userId);
                res.status(200).json({ data: deleteUserData, message: 'deleted' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = CourseController;
//# sourceMappingURL=course.controller.js.map