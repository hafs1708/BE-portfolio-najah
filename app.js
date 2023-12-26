import express from "express";
import cookieParser from "cookie-parser";

// deklarasi aplikasi express
const app = express();

// untuk membaca json dari body
app.use(express.json());

// untuk membaca cookies
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('<p>Halaman Homepage</p>')
})

// CONTACT
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

// ABOUT
app.get('/about', (req, res) => {
    // res.send('<p>Halaman About</p>')

});

app.post('/about', (req, res) => {
    res.send('<p>Halaman Untuk Menyimpan About</p>')
});

app.put('/about', (req, res) => {
    res.send('<p>Request Untuk Semua Data di About</p>')
});

app.patch('/about', (req, res) => {
    res.send('<p>Request Untuk Sebagian Data di About</p>')
});

app.delete('/about', (req, res) => {
    res.send('<p>Request Untuk Hapus Data</p>')
});

app.get('/project', (req, res) => {
    // res.send('<p>Halaman Project</p>')

    res.status(200).json({
        cookies: req.cookies,
        test: "data test"
    })
});

app.get('/blog', (req, res) => {
    res.send('<p>Halaman Blog</p>')
});

app.post('/login', (req, res) => {
    res.cookie("token", "afhaudshfsnbaudshure");
    res.cookie("username", "Najah");
    res.cookie("lokasi", "Jakarta");

    res.status(200).json({
        message: "Anda berhasil login"
    })
});

app.delete('/logout', (req, res) => {
    res.clearCookie('lokasi');
    res.clearCookie('username');
    res.clearCookie('token');

    res.status(200).json({
        message: "Semua data di cookie berhasil di hapus"
    })
});

app.listen(5000, () => {
    console.info("App is running in http://localhost:5000")
});