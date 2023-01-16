"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const compression_1 = tslib_1.__importDefault(require("compression"));
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const express_1 = tslib_1.__importDefault(require("express"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const hpp_1 = tslib_1.__importDefault(require("hpp"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
// import swaggerJSDoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';
const config_1 = require("./config");
const error_middleware_1 = tslib_1.__importDefault(require("./middlewares/error.middleware"));
const logger_1 = require("./utils/logger");
const path_1 = tslib_1.__importDefault(require("path"));
// import bodyParser from 'body-parser';
// import formidable from 'express-formidable'
// import { Routes } from './interfaces/routes.interface';
class App {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.env = config_1.node_env || 'production';
        this.port = 9001;
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        // this.initializeSwagger();
        this.initializeErrorHandling();
    }
    listen() {
        this.app.listen(this.port, () => {
            logger_1.logger.info(`=================================`);
            logger_1.logger.info(`======= ENV: ${this.env} =======`);
            logger_1.logger.info(`🚀 App listening on the port ${this.port}`);
            logger_1.logger.info(`=================================`);
        });
    }
    getServer() {
        return this.app;
    }
    initializeMiddlewares() {
        this.app.use((0, morgan_1.default)(config_1.LOG_FORMAT, { stream: logger_1.stream }));
        this.app.use((0, cors_1.default)({ origin: config_1.ORIGIN, credentials: config_1.CREDENTIALS }));
        this.app.use((0, hpp_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(express_1.default.static(path_1.default.join(__dirname, 'client')));
        this.app.use('css', express_1.default.static(path_1.default.join(__dirname + 'client/css')));
        this.app.use('img', express_1.default.static(path_1.default.join(__dirname + 'client/img')));
        this.app.use('js', express_1.default.static(path_1.default.join(`${__dirname}client/js`)));
    }
    initializeRoutes(routes) {
        routes.forEach(route => {
            this.app.use('/', route.router);
        });
    }
    //   private initializeSwagger() {
    //     const options = {
    //       swaggerDefinition: {
    //         info: {
    //           title: 'REST API',
    //           version: '1.0.0',
    //           description: 'Example docs',
    //         },
    //       },
    //       apis: ['swagger.yaml'],
    //     };
    //     const specs = swaggerJSDoc(options);
    //     this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    //   }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.default);
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map