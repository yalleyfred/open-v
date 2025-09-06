import { HttpException } from "../exceptions/HttpException";
import { request } from "http";
import multer from "multer";
import path from 'path';

const storage = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if(ext !== ".mp4" && ext !== ".mkv" && ext !== ".jpg" && ext !== ".png") {
            cb(null, false);
            return;
        }
        cb(null, true)
    }
});

export default storage;