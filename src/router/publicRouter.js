import express from 'express';
import authController from '../controller/authController.js';
import blogController from '../controller/blogController.js';
import profileController from '../controller/profileController.js';
import educationController from '../controller/educationController.js';
import projectController from '../controller/projectController.js';
import skillController from '../controller/skillController.js';
import experienceController from '../controller/experienceController.js';

export const routerPublic = express.Router();

// AUTH
routerPublic.post('/login', authController.login);

// BLOG
routerPublic.get('/blogs', blogController.getAll); // get all blogs
routerPublic.get('/blog/:id', blogController.get) // get by id

// EDUCATION
routerPublic.get('/educations', educationController.getAll);
routerPublic.get('/education/:id', educationController.get);

// PROFILE
routerPublic.get('/profile', profileController.get); // get profile

// PROJECT
routerPublic.get('/projects', projectController.getAll); // get all projects
routerPublic.get('/project/:id', projectController.get); // get by id

// SKILL
routerPublic.get('/skills', skillController.getAll);
routerPublic.get('/skill/:id', skillController.get);

// EXPERIENCE
routerPublic.get('/experiences', experienceController.getAll);
routerPublic.get('/experience/:id', experienceController.get);
