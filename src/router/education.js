import express from 'express';
import educationController from '../controller/educationController.js';

export const routerEducation = express.Router();

routerEducation.get('/education', educationController.get);
routerEducation.post('/education', educationController.post);
routerEducation.put('/education/:id', educationController.put);
routerEducation.patch('/education/:id', educationController.patch);
routerEducation.delete('/education/:id', educationController.remove);