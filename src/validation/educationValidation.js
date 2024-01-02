import Joi from "joi";
import { isString100, isYear } from "./mainValidation.js";

const isEducation = Joi.object({
    institutionName: isString100.required().label("Institution Name"),
    startYear: isYear.required().label("Start Year"),
    endYear: isYear,
    major: isString100,
    degree: Joi.string().trim().min(2).max(100)
});

export {
    isEducation
}