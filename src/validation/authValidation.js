import Joi from "joi";

const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required().label("Password")
})

const updateUserValidation = Joi.object({
    name: Joi.string().label("name"),
    email: Joi.string().email({ tlds: { allow: false } }).label("email"),
    password: Joi.string().min(6).max(100).label("Password"),
    current_password: Joi.string().min(6).max(100).label("Current Password"),
    confirm_password: Joi.string().min(6).max(100).valid(Joi.ref('password')).options({
        messages: {
            'any.only': '{{#label}} not match'
        }
    })
});

const createUserValidation = Joi.object({
    name: Joi.string().required().label("name"),
    email: Joi.string().required().email({ tlds: { allow: false } }).label("email"),
    password: Joi.string().required().min(6).max(100).label("Password"),
    confirm_password: Joi.string().min(6).max(100).required().valid(Joi.ref('password')).options({
        messages: {
            'any.only': '{{#label}} not match'
        }
    })
});

export {
    loginValidation,
    updateUserValidation,
    createUserValidation
}