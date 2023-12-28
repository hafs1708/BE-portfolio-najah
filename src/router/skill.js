import express from 'express';
import skillController from '../controller/skillController.js';

export const routerSkill = express.Router();

routerSkill.route('/skill')
    .get(skillController.get)
    .post(skillController.post);

routerSkill.route('/skill/:id')
    .put(skillController.put)
    .patch(skillController.patch)
    .delete(skillController.remove);