import Joi from "joi";
import { isString100, isString255, isText, isURI } from "./mainValidation.js";

const isProject = Joi.object({
    title: isString255.required(),
    description: isText.required(),
    startDate: Joi.date().less('now').required(),
    endDate: Joi.date().less('now'),
    status: Joi.string().valid(ON_PROGRESS, MAINTENANCE, COMPLETE),
    url: isURI,
    github: isURI,
    gitlab: isURI,
    company: isString100
});

export {
    isProject
}