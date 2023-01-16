"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const auth_route_1 = tslib_1.__importDefault(require("./routes/auth.route"));
const admin_route_1 = tslib_1.__importDefault(require("./routes/admin.route"));
const course_route_1 = tslib_1.__importDefault(require("./routes/course.route"));
const topics_route_1 = tslib_1.__importDefault(require("./routes/topics.route"));
const Database_1 = require("./Database");
const app_1 = tslib_1.__importDefault(require("./app"));
const index_route_1 = tslib_1.__importDefault(require("./routes/index.route"));
// validateEnv();
(0, Database_1.DB)();
const app = new app_1.default([new index_route_1.default(), new auth_route_1.default(), new admin_route_1.default(), new course_route_1.default(), new topics_route_1.default()]);
app.listen();
//# sourceMappingURL=server.js.map