import Joi from "joi";
import { isString100, isText, isURI } from "./mainValidation.js";

const isProfile = Joi.object({
    email: Joi.string().trim().email().lowercase().required(),
    firstname: isString100.required(),
    lastname: isString100.required(),
    avatar: Joi.string().max(255).optional().allow(null, ""),
    dob: Joi.date().less('now'),
    address: isText.required(),
    city: isString100.required(),
    country: isString100.required(),
    job: isString100.required(),
    phone: Joi.string().trim().max(20),
    bio: isText.allow(null, ""),
    website: isURI.allow(null, ""),
    github: isURI.allow(null, ""),
    gitlab: isURI.allow(null, ""),
    instagram: isURI.allow(null, ""),
    facebook: isURI.allow(null, ""),
    twitter: isURI.allow(null, ""),
    linkedin: isURI.allow(null, ""),
    discord: isURI.allow(null, "")
});

export {
    isProfile
}