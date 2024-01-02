import express from 'express';
import educationController from '../controller/educationController.js';

export const routerEducation = express.Router();

routerEducation.get('/education', educationController.getAll);
routerEducation.post('/education', educationController.post);

routerEducation.route('/education/:id')
    .get(educationController.get)
    .put(educationController.put)
    .delete(educationController.remove);