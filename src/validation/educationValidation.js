import Joi from "joi";
import { isString100, isYear } from "./mainValidation.js";

const isEducation = Joi.object({
    institutionName: isString100.required().label("Institution Name"),
    startYear: isYear.required().label("Start Year"),
    endYear: isYear,
    major: Joi.string().max(100).trim().allow(""),
    degree: Joi.string().max(100).trim().allow("")
});

export {
    isEducation
}