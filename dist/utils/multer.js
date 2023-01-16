"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const multer_1 = tslib_1.__importDefault(require("multer"));
const path_1 = tslib_1.__importDefault(require("path"));
const storage = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path_1.default.extname(file.originalname);
        if (ext !== ".mp4" && ext !== ".mkv" && ext !== ".jpg" && ext !== ".png") {
            cb(null, false);
            return;
        }
        cb(null, true);
    }
});
exports.default = storage;
//# sourceMappingURL=multer.js.map