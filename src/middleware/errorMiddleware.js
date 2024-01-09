import Joi from "joi";
import { ResponseError } from "../error/responseError.js";

export const errorMiddleware = (error, req, res, next) => {
    if (!error) { return next() }

    // RESPONSE ERROR
    if (error instanceof ResponseError) {
        return res.status(error.status).json({
            message: error.message
        });
    }

    // JOI VALIDATE ERROR
    if (error instanceof Joi.ValidationError) {
        return res.status(400).json({
            message: error.message
        });
    }

    // SERVER ERROR
    res.status(500).json({
        message: "Server error : " + error.message
    });
}