"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
const HttpException_1 = require("../exceptions/HttpException");
const students_model_1 = tslib_1.__importDefault(require("../models/students.model"));
const admins_model_1 = tslib_1.__importDefault(require("../models/admins.model"));
const authMiddleware = async (req, res, next) => {
    try {
        const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
        if (Authorization) {
            const secretKey = config_1.SECRET_KEY;
            const verificationResponse = (await (0, jsonwebtoken_1.verify)(Authorization, secretKey));
            const userId = verificationResponse.id;
            const findUser = await students_model_1.default.findOne({
                where: {
                    id: userId
                }
            });
            const findAdmin = await admins_model_1.default.findOne({
                where: {
                    id: userId
                }
            });
            if (findUser || findAdmin) {
                req.user = findUser || findAdmin;
                next();
            }
            else {
                next(new HttpException_1.HttpException(401, 'Wrong authentication token'));
            }
        }
        else {
            next(new HttpException_1.HttpException(404, 'Authentication token missing'));
        }
    }
    catch (error) {
        next(new HttpException_1.HttpException(401, 'Wrong authentication token'));
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map