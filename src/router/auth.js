import express from 'express';
import authController from '../controller/authController.js';

export const routerAuth = express.Router();

routerAuth.post('/login', authController.login);
routerAuth.delete('/logout', authController.logout);