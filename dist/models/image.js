"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formidable = require('formidable'); // import formidable package
const form = new formidable.IncomingForm();
const uploadImage = function () { };
uploadImage.prototype.byFile = (req, res, callback) => {
    form.parse(req); // parse the request files
    /* @fileBegin : Begains to upload files */
    form.on('fileBegin', (name, file) => {
        file.path = `${__dirname}/../../public/assets/${file.name}`; // upload files to the directory
    });
    /* @error : On error We can send resposnse as failed with err message */
    form.on('error', (err) => callback(false, { reason: err, statusCode: 302 }));
    /* @end: When all the files are uploaded send response as success with success message */
    form.on('end', () => {
        callback(false, { message: `Image Uploaded Successfully`, statusCode: 200 });
    });
};
module.exports = uploadImage();
//# sourceMappingURL=image.js.map