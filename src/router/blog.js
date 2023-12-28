import express from 'express';
import blogController from '../controller/blogController.js';


export const routerBlog = express.Router();

routerBlog.route('/blog')
    .get(blogController.get)
    .post(blogController.post);

routerBlog.route('/blog/:id')
    .put(blogController.put)
    .patch(blogController.patch)
    .delete(blogController.remove);