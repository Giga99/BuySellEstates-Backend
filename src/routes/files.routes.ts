import express from 'express';
import { uploadMultipleImagesMulter, uploadSingleImageMulter } from '../helpers/multer';
import { FilesController } from '../controllers/files.controller';
const filesRouter = express.Router();

filesRouter.route('/uploadSingleFile').post(
    uploadSingleImageMulter.single('file'), (req, res, next) => new FilesController().uploadSingleFile(req, res, next)
);

filesRouter.route('/uploadMultipleFiles').post(
    uploadMultipleImagesMulter.array('files'), (req, res, next) => new FilesController().uploadMultipleFiles(req, res, next)
);

export default filesRouter;