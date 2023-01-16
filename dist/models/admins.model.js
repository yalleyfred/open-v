"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
;
let Admin = class Admin extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], Admin.prototype, "id", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Admin.prototype, "name", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Admin.prototype, "email", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Admin.prototype, "password", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Date)
], Admin.prototype, "passwordResetExpires", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Admin.prototype, "passwordResetToken", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Default)(false),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Boolean)
], Admin.prototype, "active", void 0);
Admin = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "Admins",
        timestamps: true
    })
], Admin);
exports.default = Admin;
//# sourceMappingURL=admins.model.js.map