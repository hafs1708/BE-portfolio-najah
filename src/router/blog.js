import express from 'express';
import blogController from '../controller/blogController.js';
import fileService from '../service/fileService.js';

export const routerBlog = express.Router();

// save new blog
routerBlog.post('/blog', fileService.upload.array('photos', 10), blogController.post);

// update title only
routerBlog.patch('/update_blog_title/:id', blogController.updateTitle);

// update blog + photo
routerBlog.put('/blog/:id', fileService.upload.array('photos', 10), blogController.put) // update by id

// delete
routerBlog.delete('/blog/:id', blogController.remove); // remove by id
