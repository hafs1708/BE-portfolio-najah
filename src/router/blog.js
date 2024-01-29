import express from 'express';
import blogController from '../controller/blogController.js';
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

export const routerBlog = express.Router();

// save new blog
routerBlog.post('/blog', upload.array('photos', 10), blogController.post);
// update title only
routerBlog.patch('/update_blog_title/:id', blogController.updateTitle);

routerBlog.route('/blog/:id')
    .put(blogController.put) // update by id
    .delete(blogController.remove); // remove by id
