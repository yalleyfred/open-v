"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sequelize_typescript_1 = require("sequelize-typescript");
;
let Topic = class Topic extends sequelize_typescript_1.Model {
};
tslib_1.__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], Topic.prototype, "id", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Topic.prototype, "heading", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotEmpty,
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING)),
    tslib_1.__metadata("design:type", Array)
], Topic.prototype, "paragraph", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Topic.prototype, "illustration", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Topic.prototype, "video", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.NotEmpty,
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], Topic.prototype, "reference", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.AllowNull)(true),
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], Topic.prototype, "course_id", void 0);
Topic = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "Topics",
        timestamps: true
    })
], Topic);
exports.default = Topic;
// import { Model, Sequelize, DataTypes } from 'sequelize';
// export default class TopicModel extends Model {
//   public id!: number;
//   public heading!: string;
//   public paragragh!: string[];
//   public illustration!: string;
//   public video!: string;
//   public reference!: string;
// }
// export const TopicMap = (sequelize: Sequelize) => {
//   TopicModel.init(
//     {
//       id: {
//         type: DataTypes.BIGINT,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       heading: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       paragragh: {
//         type: DataTypes.ARRAY(DataTypes.STRING),
//         allowNull: false,
//       },
//       illustration: {
//         type: DataTypes.STRING,
//       },
//       video: {
//         type: DataTypes.STRING,
//       },
//       reference: {
//         type: DataTypes.STRING,
//       }
//     },
//     {
//       sequelize,
//       tableName: "Topics",
//       timestamps: true,
//     }
//   );
//   TopicModel.sync();
// };
//# sourceMappingURL=topics.model.js.map