import Joi from "joi";

const isID = Joi.number().min(1).positive().required().label("ID");

export {
    isID
}