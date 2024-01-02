import Joi from "joi";

const isID = Joi.number().min(1).positive().required().label("ID");
const isString100 = Joi.string().trim().min(3).max(100);
const isString255 = Joi.string().trim().min(3).max(255);
const isYear = Joi.number().positive();

export {
    isID,
    isString100,
    isString255,
    isYear
}