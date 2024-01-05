import express from 'express';
import blogController from '../controller/blogController.js';

export const routerPublic = express.Router();

// BLOG
routerPublic.get('/blogs', blogController.getAll); // get all blogs
routerPublic.get('/blog/:id', blogController.get) // get by id
