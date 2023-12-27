import express from 'express';

export const routerProject = express.Router();

routerProject.get('/project', (req, res) => {
    // res.send('<p>Halaman Project</p>')

    res.status(200).json({
        cookies: req.cookies,
        test: "data test"
    })
});

// PATH: METHOD POST UNTUK MENYIMPAN DATA project
routerProject.post('/project', (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan"
    });
});

// PATH: METHOD PUT UNTUK MENYIMPAN SELURUH DATA project
routerProject.put('/project/:id', (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan seluruhnya"
    });
});

// PATH: METHOD PATCH UNTUK MENYIMPAN SEBAGIAN DATA project
routerProject.patch('/project/:id', (req, res) => {
    res.status(200).json({
        message: "Data sebagian berhasil disimpan"
    });
});

// PATH: METHOD DELETE UNTUK MENGHAPUS DATA project SESUAI ID
routerProject.delete('/project/:id', (req, res) => {
    res.status(200).json({
        message: "Data berhasil dihapus"
    });
});