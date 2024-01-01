import express from 'express';
import blogController from '../controller/blogController.js';

export const routerBlog = express.Router();

// get all blogs
routerBlog.get('/blogs', blogController.getAll);
// save new blog
routerBlog.post('/blog', blogController.post);
// update title only
routerBlog.patch('/update_blog_title/:id', blogController.updateTitle);

routerBlog.route('/blog/:id')
    .get(blogController.get) // get by id
    .put(blogController.put) // update by id
    .delete(blogController.remove); // remove by id
