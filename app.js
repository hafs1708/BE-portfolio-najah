import express from "express";
import cookieParser from "cookie-parser";
import { routerProfile } from "./src/router/profile.js";
import { routerEducation } from "./src/router/education.js";
import { routerProject } from "./src/router/project.js";
import { routerBlog } from "./src/router/blog.js";
import { routerSkill } from "./src/router/skill.js";
import { routerAuth } from "./src/router/auth.js";

// deklarasi aplikasi express
const app = express();

// untuk membaca json dari body
app.use(express.json());

// untuk membaca cookies
app.use(cookieParser());

// Belajar MIDDLEWARE => LOGIN
app.use((req, res, next) => {
    const time = new Date().toLocaleDateString();
    const log = {
        time: time,
        path: req.path,
        method: req.method,
        query: req.query,
        cookies: req.cookies,
        protocol: req.protocol,
        body: req.body
    }
    console.info(log)
    next()
});

// ------- HOME ---------
app.get('/', (req, res) => {
    res.send('<p>Halaman Homepage</p>')
})

// ------- CONTACT --------
app.get('/contact', (req, res) => {
    res.status(200).format({
        json: () => {
            res.send({
                ip: req.ip,
                query: req.query,
                body: req.body,
                nama_jalan: req.path
            })
        }
    })
});

app.post('/contact', (req, res) => {
    res.send('<p>Halaman Untuk Menyimpan Contact </p>')
});

app.put('/contact/:id', (req, res) => {
    // res.send('<p>Request Untuk Semua Data di Contact </p>')
    res.status(200).format({
        json: () => {
            res.send({
                ip: req.ip,
                query: req.query,
                body: req.body,
                nama_jalan: req.path,
                params: req.params
            })
        }
    })
});

app.patch('/contact', (req, res) => {
    res.send('<p>Request Untuk Sebagian Data di Contact </p>')
});

app.delete('/contact', (req, res) => {
    res.send('<p>Request Untuk Hapus Data</p>')
});

//------- PROFILE --------
app.use(routerProfile);

//------- EDUCATION --------
app.use(routerEducation);

//-------- PROJECT --------
app.use(routerProject);

// -------- BLOG -------
app.use(routerBlog);

//------- SKILL --------
app.use(routerSkill);

//------- AUTH ------
app.use(routerAuth);

// MIDDLEWARE UNTUK PATH ASING / UNKNOWN PAGE
app.use((req, res) => {
    res.status(404).json({
        message: "Halaman tidak ditemukan"
    });
});

app.listen(5000, () => {
    console.info("App is running in http://localhost:5000")
});