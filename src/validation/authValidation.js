import Joi from "joi";

const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required().label("Password")
})

export {
    loginValidation
}