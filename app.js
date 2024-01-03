// LOAD ENV
import dotenv from 'dotenv'
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";

import { routerProfile } from "./src/router/profile.js";
import { routerEducation } from "./src/router/education.js";
import { routerProject } from "./src/router/project.js";
import { routerBlog } from "./src/router/blog.js";
import { routerSkill } from "./src/router/skill.js";
import { routerAuth } from "./src/router/auth.js";
import { logging } from "./src/middleware/logging.js";
import { notFound } from "./src/middleware/notfound.js";
import Joi from 'joi';
import { ResponseError } from './src/error/responseError.js';
// import { JoiError } from './src/application/validate.js';

// deklarasi aplikasi express
const app = express();

// untuk membaca json dari body
app.use(express.json());

// untuk membaca cookies
app.use(cookieParser());

// MIDDLEWARE LOGGING
app.use(logging);

// ROUTER PROFILE 
app.use(routerProfile);

// ROUTER EDUCATION
app.use(routerEducation);

// ROUTER PROJECT 
app.use(routerProject);

// ROUTER BLOG
app.use(routerBlog);

// ROUTER SKILL 
app.use(routerSkill);

// ROUTER AUTH
app.use(routerAuth);

// MIDDLEWARE UNTUK PATH ASING / UNKNOWN PAGE
app.use(notFound);

// MIDDLEWARE ERROR
app.use((error, req, res, next) => {
    if (!error) {
        return next();
    }

    // RESPONSE ERROR
    if (error instanceof ResponseError) {
        return res.status(404).json({
            message: error.message
        });
    }

    // JOI VALIDATE ERROR
    if (error instanceof Joi.ValidationError) {
        return res.status(error.status).json({
            message: error.message
        }).end();
    }

    // SERVER ERROR
    res.status(500).json({
        message: "Server error : " + error.message
    }).end();
});

const port = process.env.PORT || 5000;
console.log(port);
app.listen(port, () => {
    console.info("App is running in http://localhost:" + port)
});