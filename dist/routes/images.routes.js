"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const images_controller_1 = require("../controllers/images.controller");
const imagesRouter = express_1.default.Router();
imagesRouter.route('/uploadImage').post((req, res) => new images_controller_1.ImagesController().uploadImage(req, res));
exports.default = imagesRouter;
//# sourceMappingURL=images.routes.js.map