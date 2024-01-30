import fs from 'fs/promises';
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

const upload = multer({ storage: storage });

const createFolder = async (folderName) => {
    try {
        // coba akses folder
        await fs.access(folderName);
    } catch (error) {
        // kalo gagal, maka buat folder
        await fs.mkdir(folderName);
    }
}

const removeFile = async (file) => {
    try {
        await fs.rm('./' + file);
    } catch (error) {
        // throw (error);
    }
}

const getUploadPhotos = (req) => {
    const photos = [];
    if (req.files) {
        // loop photos
        for (const file of req.files) {
            // add slash to photo
            let photo = '/' + file.path.replaceAll("\\", "/");

            // buat object photo berdasarkan schema photo
            photo = {
                path: photo
            };

            // push to photos
            photos.push(photo);
        }
    }
    return photos;
}

export default {
    createFolder,
    removeFile,
    upload,
    getUploadPhotos
}