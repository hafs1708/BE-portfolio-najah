import express from 'express';
import educationController from '../controller/educationController.js';

export const routerEducation = express.Router();

routerEducation.route('/education')
    .get(educationController.get)
    .post(educationController.post);

routerEducation.route('/education/:id')
    .put(educationController.put)
    .patch(educationController.patch)
    .delete(educationController.remove);