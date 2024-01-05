import express from 'express';
import authController from '../controller/authController.js';
import blogController from '../controller/blogController.js';

export const routerPublic = express.Router();

// AUTH
routerPublic.post('/login', authController.login);

// BLOG
routerPublic.get('/blogs', blogController.getAll); // get all blogs
routerPublic.get('/blog/:id', blogController.get) // get by id
