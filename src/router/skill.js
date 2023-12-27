import express from 'express';
import skillController from '../controller/skillController.js';

export const routerSkill = express.Router();

routerSkill.get('/skill', skillController.get);
routerSkill.post('/skill', skillController.post);
routerSkill.put('/skill/:id', skillController.put);
routerSkill.patch('/skill/:id', skillController.patch);
routerSkill.delete('/skill/:id', skillController.remove);