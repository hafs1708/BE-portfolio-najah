import express from 'express';
import profileController from '../controller/profileController.js';

export const routerProfile = express.Router();

// update profile
routerProfile.put('/profile', profileController.put);
