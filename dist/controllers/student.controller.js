"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const students_service_1 = tslib_1.__importDefault(require("../services/students.service"));
// import {LocalDB} from '../Database'
class StudentController {
    constructor() {
        this.studentService = new students_service_1.default();
        this.getUsers = async (req, res, next) => {
            try {
                const findAllUsersData = await this.studentService.findAllUser();
                res.status(200).json({ data: findAllUsersData, message: 'findAll' });
            }
            catch (error) {
                next(error);
            }
        };
        this.getUserById = async (req, res, next) => {
            try {
                const userId = Number(req.params.id);
                const findOneUserData = await this.studentService.findUserById(userId);
                res.status(200).json({ data: findOneUserData, message: 'findOne' });
            }
            catch (error) {
                next(error);
            }
        };
        this.createUser = async (req, res, next) => {
            try {
                const userData = req.body;
                // console.log(userData);
                const createUserData = await this.studentService.createUser(userData);
                res.status(201).json({ data: createUserData, message: 'created' });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateUser = async (req, res, next) => {
            try {
                const userId = Number(req.params.id);
                const userData = req.body;
                const updateUserData = await this.studentService.updateUser(userId, userData);
                res.status(200).json({ data: updateUserData, message: 'updated' });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteUser = async (req, res, next) => {
            try {
                const userId = Number(req.params.id);
                const deleteUserData = await this.studentService.deleteUser(userId);
                res.status(200).json({ data: deleteUserData, message: 'deleted' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = StudentController;
//# sourceMappingURL=student.controller.js.map