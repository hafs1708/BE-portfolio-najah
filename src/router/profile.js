import express from 'express';
import profileController from '../controller/profileController.js';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        // date + random number
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

        // get file extention
        const ext = file.originalname.split('.').pop();

        // cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
    }
})

const upload = multer({ storage: storage })

export const routerProfile = express.Router();

// update profilehttps://discord.com/channels/1105443314880233484/1105443315446468684
routerProfile.put('/profile', upload.single('avatar'), profileController.put);
