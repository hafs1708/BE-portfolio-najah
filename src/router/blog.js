import express from 'express';
import blogController from '../controller/blogController.js';


export const routerBlog = express.Router();

routerBlog.get('/blog', blogController.get);
routerBlog.post('/blog', blogController.post);
routerBlog.put('/blog/:id', blogController.put);
routerBlog.patch('/blog/:id', blogController.patch);
routerBlog.delete('/blog/:id', blogController.remove);