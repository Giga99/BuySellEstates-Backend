"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesController = void 0;
const image = require('../models/image/uploadImage');
class ImagesController {
    constructor() {
        this.uploadImage = (req, res) => {
            image.byFile(req, res, (err, data) => {
                if (err) {
                    res.status(data.statusCode).json(data); // send erroe response with status and err message
                }
                else {
                    res.status(data.statusCode).json(data); // send success response with status and data
                }
            });
        };
    }
}
exports.ImagesController = ImagesController;
//# sourceMappingURL=images.controller.js.map