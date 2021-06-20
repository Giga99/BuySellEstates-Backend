import express from 'express';

export class FilesController {

    uploadSingleFile = (req: express.Request, res: express.Response, next: (arg0: Error) => any) => {
        let file = req.file;
        if (!file) {
            return next(new Error('No File'));
        }
        res.send(file);
    }

    uploadMultipleFiles = (req: express.Request, res: express.Response, next: (arg0: Error) => any) => {
        let files = req.files;

        if (!files) {
            return next(new Error('No File'));
        }
        res.send(files);
    }
}
