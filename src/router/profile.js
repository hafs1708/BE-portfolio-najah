import express from 'express';
import profileController from '../controller/profileController.js';

export const routerProfile = express.Router();

routerProfile.route('/profile')
    .get(profileController.get)
    .post(profileController.post);

routerProfile.route('/profile/:id')
    .put(profileController.put)
    .patch(profileController.patch)
    .delete(profileController.remove);