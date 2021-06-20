"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesController = void 0;
class FilesController {
    constructor() {
        this.uploadSingleFile = (req, res, next) => {
            let file = req.file;
            if (!file) {
                return next(new Error('No File'));
            }
            res.send(file);
        };
        this.uploadMultipleFiles = (req, res, next) => {
            let files = req.files;
            if (!files) {
                return next(new Error('No File'));
            }
            res.send(files);
        };
    }
}
exports.FilesController = FilesController;
//# sourceMappingURL=files.controller.js.map