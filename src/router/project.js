import express from 'express';
import projectController from '../controller/projectController.js';


export const routerProject = express.Router();

routerProject.get('/project', projectController.get);
routerProject.post('/project', projectController.post);
routerProject.put('/project/:id', projectController.put);
routerProject.patch('/project/:id', projectController.patch);
routerProject.delete('/project/:id', projectController.remove);