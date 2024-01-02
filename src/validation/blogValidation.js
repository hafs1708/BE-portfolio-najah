import Joi from "joi";

const isBlogTitle = Joi.string().trim().min(3).max(255).required().label("Title");

const isBlog = Joi.object({
    title: Joi.string().trim().min(3).max(255).required().label("Title"),
    content: Joi.string().trim().min(3).required().label("Content")
});

export {
    isBlog,
    isBlogTitle
}