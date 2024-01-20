import Joi from "joi";
import { isString100, isText } from "./mainValidation.js";

const isExperience = Joi.object({
    company: isString100.required().label("Company Name"),
    location: isString100.required().label("Location"),
    title: isString100.required().label("Title"),
    description: isText.required().label("Description"),
    startDate: Joi.date().max("now").required().label("Start Date"),
    endDate: Joi.date().min(Joi.ref("startDate")).max("now").label("End Date")
});

export {
    isExperience
}