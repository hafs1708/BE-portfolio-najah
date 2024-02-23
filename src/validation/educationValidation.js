import Joi from "joi";
import { isString100, isYear } from "./mainValidation.js";

const currentYear = new Date().getFullYear();
const isEducation = Joi.object({
    institutionName: isString100.required().label("Institution Name"),
    startYear: isYear.required().max(currentYear).label("Start Year"),
    endYear: isYear.min(Joi.ref('startYear')).max(currentYear).allow(null),
    major: Joi.string().max(100).trim().allow(""),
    degree: Joi.string().max(100).trim().allow("")
});

export {
    isEducation
}