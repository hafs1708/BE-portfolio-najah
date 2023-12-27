import express from "express";
import cookieParser from "cookie-parser";
import { routerProfile } from "./src/router/profile";

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
app.get('/education', (req, res) => {
    res.status(200).json({
        message: "Berhasil"
    });
});

// PATH: METHOD POST UNTUK MENYIMPAN DATA education
app.post('/education', (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan"
    });
});

// PATH: METHOD PUT UNTUK MENYIMPAN SELURUH DATA education
app.put('/education/:id', (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan seluruhnya"
    });
});

// PATH: METHOD PATCH UNTUK MENYIMPAN SEBAGIAN DATA education
app.patch('/education/:id', (req, res) => {
    res.status(200).json({
        message: "Data sebagian berhasil disimpan"
    });
});

// PATH: METHOD DELETE UNTUK MENGHAPUS DATA education SESUAI ID
app.delete('/education/:id', (req, res) => {
    res.status(200).json({
        message: "Data berhasil dihapus"
    });
});

//-------- PROJECT --------
app.get('/project', (req, res) => {
    // res.send('<p>Halaman Project</p>')

    res.status(200).json({
        cookies: req.cookies,
        test: "data test"
    })
});

// PATH: METHOD POST UNTUK MENYIMPAN DATA project
app.post('/project', (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan"
    });
});

// PATH: METHOD PUT UNTUK MENYIMPAN SELURUH DATA project
app.put('/project/:id', (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan seluruhnya"
    });
});

// PATH: METHOD PATCH UNTUK MENYIMPAN SEBAGIAN DATA project
app.patch('/project/:id', (req, res) => {
    res.status(200).json({
        message: "Data sebagian berhasil disimpan"
    });
});

// PATH: METHOD DELETE UNTUK MENGHAPUS DATA project SESUAI ID
app.delete('/project/:id', (req, res) => {
    res.status(200).json({
        message: "Data berhasil dihapus"
    });
});

// -------- BLOG -------
app.get('/blog', (req, res) => {
    res.status(200).json({
        message: "Berhasil"
    });
});

// PATH: METHOD POST UNTUK MENYIMPAN DATA blog
app.post('/blog', (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan"
    });
});

// PATH: METHOD PUT UNTUK MENYIMPAN SELURUH DATA blog
app.put('/blog/:id', (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan seluruhnya"
    });
});

// PATH: METHOD PATCH UNTUK MENYIMPAN SEBAGIAN DATA blog
app.patch('/blog/:id', (req, res) => {
    res.status(200).json({
        message: "Data sebagian berhasil disimpan"
    });
});

// PATH: METHOD DELETE UNTUK MENGHAPUS DATA blog SESUAI ID
app.delete('/blog/:id', (req, res) => {
    res.status(200).json({
        message: "Data berhasil dihapus"
    });
});

//------- SKILL --------
app.get('/skill', (req, res) => {
    res.status(200).json({
        message: "Berhasil"
    });
});

// PATH: METHOD POST UNTUK MENYIMPAN DATA skill
app.post('/skill', (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan"
    });
});

// PATH: METHOD PUT UNTUK MENYIMPAN SELURUH DATA skill
app.put('/skill/:id', (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan seluruhnya"
    });
});

// PATH: METHOD PATCH UNTUK MENYIMPAN SEBAGIAN DATA skill
app.patch('/skill/:id', (req, res) => {
    res.status(200).json({
        message: "Data sebagian berhasil disimpan"
    });
});

// PATH: METHOD DELETE UNTUK MENGHAPUS DATA skill SESUAI ID
app.delete('/skill/:id', (req, res) => {
    res.status(200).json({
        message: "Data berhasil dihapus"
    });
});

// PATH: METHOD POST UNTUK LOGIN
app.post('/login', (req, res) => {
    res.cookie("token", "afhaudshfsnbaudshure");
    res.cookie("username", "Najah");
    res.cookie("lokasi", "Jakarta");

    res.status(200).json({
        message: "Anda berhasil login"
    })
});

// PATH: METHOD DELETE UNTUK LOGOUT
app.delete('/logout', (req, res) => {
    res.clearCookie('lokasi');
    res.clearCookie('username');
    res.clearCookie('token');

    res.status(200).json({
        message: "Semua data di cookie berhasil di hapus"
    })
});

// MIDDLEWARE UNTUK PATH ASING / UNKNOWN PAGE
app.use((req, res) => {
    res.status(404).json({
        message: "Halaman tidak ditemukan"
    });
});

app.listen(5000, () => {
    console.info("App is running in http://localhost:5000")
});