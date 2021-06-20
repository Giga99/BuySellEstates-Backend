import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '../frontend/app/src/assets/users');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

const storage2 = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, '../frontend/app/src/assets/estates');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

export const uploadSingleImageMulter = multer({ storage: storage });
export const uploadMultipleImagesMulter = multer({ storage: storage2 });