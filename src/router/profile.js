import express from 'express';
import profileController from '../controller/profileController.js';

export const routerProfile = express.Router();

routerProfile.get('/profile', profileController.get);
routerProfile.post('/profile', profileController.post);
routerProfile.put('/profile/:id', profileController.put);
routerProfile.patch('/profile/:id', profileController.patch);
routerProfile.delete('/profile/:id', profileController.remove);