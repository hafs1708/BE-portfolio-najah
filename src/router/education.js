import express from 'express';
import educationController from '../controller/educationController.js';

export const routerEducation = express.Router();

// SAVE NEW
routerEducation.post('/education', educationController.post);

routerEducation.route('/education/:id')
    .put(educationController.put)
    .delete(educationController.remove);