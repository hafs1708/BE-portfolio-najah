import Joi from "joi";
import { isString100, isText, isURI } from "./mainValidation.js";

const isProfile = Joi.object({
    email: Joi.string().trim().email().lowercase().required(),
    firstname: isString100.required(),
    lastname: isString100.required(),
    avatar: Joi.string().max(255).optional(),
    dob: Joi.date().less('now'),
    address: isText.required(),
    city: isString100.required(),
    country: isString100.required(),
    job: isString100.required(),
    phone: Joi.string().trim().max(20),
    bio: isText,
    website: isURI,
    github: isURI,
    gitlab: isURI,
    instagram: isURI,
    facebook: isURI,
    twitter: isURI,
    linkedin: isURI,
    discord: isURI
});

export {
    isProfile
}