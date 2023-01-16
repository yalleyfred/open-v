"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTopicDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateTopicDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateTopicDto.prototype, "heading", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    tslib_1.__metadata("design:type", Array)
], CreateTopicDto.prototype, "paragraph", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateTopicDto.prototype, "illustration", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateTopicDto.prototype, "video", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateTopicDto.prototype, "reference", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CreateTopicDto.prototype, "course_id", void 0);
exports.CreateTopicDto = CreateTopicDto;
//# sourceMappingURL=topic.dto.js.map