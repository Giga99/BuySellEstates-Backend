"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMultipleImagesMulter = exports.uploadSingleImageMulter = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '../frontend/app/src/assets/users');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});
const storage2 = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '../frontend/app/src/assets/estates');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});
exports.uploadSingleImageMulter = multer_1.default({ storage: storage });
exports.uploadMultipleImagesMulter = multer_1.default({ storage: storage2 });
//# sourceMappingURL=multer.js.map