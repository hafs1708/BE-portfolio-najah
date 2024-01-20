import express from 'express';
import experienceController from '../controller/experienceController';

export const routerExperience = express.Router();

// SAVE NEW
routerExperience.post('/experience', experienceController.post);

routerExperience.route('/experience/:id')
    .put(experienceController.put)
    .delete(experienceController.remove);