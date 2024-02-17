import express from 'express';
import authController from '../controller/authController.js';

export const routerAuth = express.Router();

routerAuth.delete('/logout', authController.logout);

// get user
routerAuth.get('/user', authController.get);

// update user -> name & password
routerAuth.put('/user', authController.put);