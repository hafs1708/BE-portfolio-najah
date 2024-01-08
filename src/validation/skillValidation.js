import Joi from "joi";
import { isString100 } from "./mainValidation.js";

const isSkill = Joi.object({
    title: isString100.required(),
    category: isString100.uppercase().required()
});

export {
    isSkill
}