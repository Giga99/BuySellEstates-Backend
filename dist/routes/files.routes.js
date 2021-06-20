"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = require("../helpers/multer");
const files_controller_1 = require("../controllers/files.controller");
const filesRouter = express_1.default.Router();
filesRouter.route('/uploadSingleFile').post(multer_1.uploadSingleImageMulter.single('file'), (req, res, next) => new files_controller_1.FilesController().uploadSingleFile(req, res, next));
filesRouter.route('/uploadMultipleFiles').post(multer_1.uploadMultipleImagesMulter.array('files'), (req, res, next) => new files_controller_1.FilesController().uploadMultipleFiles(req, res, next));
exports.default = filesRouter;
//# sourceMappingURL=files.routes.js.map