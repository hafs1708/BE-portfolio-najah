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
import { ResponseError } from './src/error/responseError.js';
import { errorMiddleware } from './src/middleware/errorMiddleware.js';
import { routerPublic } from './src/router/publicRouter.js';
import { Prisma } from './src/application/prisma.js';
import jwt from "jsonwebtoken";
// import { JoiError } from './src/application/validate.js';

// deklarasi aplikasi express
const app = express();

// untuk membaca json dari body
app.use(express.json());

// untuk membaca cookies
app.use(cookieParser());

// MIDDLEWARE LOGGING
app.use(logging);

// PUBLIC API / TANPA LOGIN
app.use(routerPublic);

// ROUTER DIBAWAH AKAN DI CEK AUTH / APAKAH SUDAH LOGIN
// MIDDLEWARE AUTHENTICATION
app.use(async (req, res, next) => {
    try {
        console.log("PROSES CEK AUTHENTICATION");

        // CHECK TOKEN FROM COOKIE
        const token = req.cookies.token
        if (!token) throw new Error();

        // CHECK USER BY TOKEN
        const user = await Prisma.user.findFirst({
            where: {
                token: token
            }
        });

        if (!user) throw new Error();

        // CHECK TOKEN EXPIRED
        const jwtscreet = 'TOKENPORTFOLIONAJAH';
        jwt.verify(token, jwtscreet);

        // UPDATE TOKEN
        // const maxAge = 60 * 60 // 1 jam
        const maxAge = 10; // 10 detik
        var newtoken = jwt.sign({ email: user.email }, jwtscreet, {
            expiresIn: maxAge
        });

        // CARA UNTUK KIRIM COOKIE KE CLIENT/BROWSER
        res.cookie("token", newtoken);

        // UPDATE USER TOKEN IN DB
        await Prisma.user.update({
            where: {
                email: user.email
            },
            data: {
                token: newtoken
            }
        });

        next();
    } catch (error) {
        // hapus cookie di client / browser / postman 
        res.clearCookie('token');

        return res.status(401).json({
            message: "Anda belom login"
        })
    }
});

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
app.use(errorMiddleware);

const port = process.env.PORT || 5000;
console.log(port);
app.listen(port, () => {
    console.info("App is running in http://localhost:" + port)
});