import express from 'express';
import profileController from '../controller/profileController.js';
import fileService from '../service/fileService.js';

export const routerProfile = express.Router();

routerProfile.put('/profile', fileService.upload.single('avatar'), profileController.put);
