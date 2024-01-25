// LOAD ENV
import dotenv from 'dotenv'
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';

import { routerProfile } from "./src/router/profile.js";
import { routerEducation } from "./src/router/education.js";
import { routerProject } from "./src/router/project.js";
import { routerBlog } from "./src/router/blog.js";
import { routerSkill } from "./src/router/skill.js";
import { routerAuth } from "./src/router/auth.js";
import { routerExperience } from "./src/router/experience.js";
import { logging } from "./src/middleware/logging.js";
import { notFound } from "./src/middleware/notfound.js";
import { errorMiddleware } from './src/middleware/errorMiddleware.js';
import { routerPublic } from './src/router/publicRouter.js';
import { authMiddleware } from './src/middleware/authMiddleware.js';
import fileService from './src/service/fileService.js';

// deklarasi aplikasi express
const app = express();

// untuk membaca json dari body
app.use(express.json());

// untuk membaca cookies
app.use(cookieParser());

// CORS
app.use(cors({
    origin: 'http://localhost:3000'
}));

// MIDDLEWARE LOGGING
app.use(logging);

// CREATE FOLDER UPLOADS
fileService.createFolder('./uploads');

// PUBLIC API / TANPA LOGIN
app.use(routerPublic);

// ROUTER DIBAWAH AKAN DI CEK AUTH / APAKAH SUDAH LOGIN
// MIDDLEWARE AUTHENTICATION
app.use(authMiddleware);

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

// ROUTER EXPERIENCE
app.use(routerExperience)

// MIDDLEWARE UNTUK PATH ASING / UNKNOWN PAGE
app.use(notFound);

// MIDDLEWARE ERROR
app.use(errorMiddleware);

const port = process.env.PORT || 5000;
console.log(port);
app.listen(port, () => {
    console.info("App is running in http://localhost:" + port)
});