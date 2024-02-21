import Joi from "joi";
import { isString100, isText, isURI } from "./mainValidation.js";

const nonRequaired = {
    avatar: Joi.string().max(255).optional().allow(null, ""),
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
}

const isCreateProfile = Joi.object({
    email: Joi.string().trim().email().lowercase().required(),
    firstname: isString100.required(),
    lastname: isString100.required(),
    dob: Joi.date().less('now'),
    address: isText.required(),
    city: isString100.required(),
    country: isString100.required(),
    job: isString100.required(),
    ...nonRequaired
});

const isUpdateProfile = Joi.object({
    email: Joi.string().trim().email().lowercase(),
    firstname: isString100,
    lastname: isString100,
    dob: Joi.date().less('now'),
    address: isText,
    city: isString100,
    country: isString100,
    job: isString100,
    ...nonRequaired
});

export {
    isCreateProfile,
    isUpdateProfile
}