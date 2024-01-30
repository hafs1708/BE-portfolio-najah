import express from 'express';
import projectController from '../controller/projectController.js';
import fileService from '../service/fileService.js';

export const routerProject = express.Router();

// create
routerProject.post('/project', fileService.upload.array('photos', 10), projectController.post);

routerProject.route('/project/:id')
    .put(fileService.upload.array('photos', 10), projectController.put) // update
    .delete(projectController.remove); // remove