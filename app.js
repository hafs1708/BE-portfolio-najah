import express from "express";

const app = express();

app.use(express.json());

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
    res.cookie("token", "afhaudshfsnbaudshure"),
    res.cookie("username", "Najah")
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
    res.send('<p>Halaman Project</p>')
});

app.get('/blog', (req, res) => {
    res.send('<p>Halaman Blog</p>')
});

app.listen(5000, () => {
    c =>onsole.info("App is running in http://localhost:5000")
});