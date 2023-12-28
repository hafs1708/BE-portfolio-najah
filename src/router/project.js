import express from 'express';
import projectController from '../controller/projectController.js';


export const routerProject = express.Router();

routerProject.route('/project')
    .get(projectController.get)
    .post(projectController.post);

routerProject.route('/project/:id')
    .put(projectController.put)
    .patch(projectController.patch)
    .delete(projectController.remove);