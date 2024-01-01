import express from 'express';
import blogController from '../controller/blogController.js';


export const routerBlog = express.Router();

routerBlog.get('/blogs', blogController.getAll);
routerBlog.get('/blog/:id', blogController.get);
routerBlog.post('/blog', blogController.post);

routerBlog.route('/blog/:id')
    .put(blogController.put)
    .delete(blogController.remove);

routerBlog.patch('/update_blog_title/:id', blogController.updateTitle);