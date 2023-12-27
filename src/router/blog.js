import express from 'express';

export const routerBlog = express.Router();

routerBlog.get('/blog', (req, res) => {
    res.status(200).json({
        message: "Berhasil"
    });
});

// PATH: METHOD POST UNTUK MENYIMPAN DATA blog
routerBlog.post('/blog', (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan"
    });
});

// PATH: METHOD PUT UNTUK MENYIMPAN SELURUH DATA blog
routerBlog.put('/blog/:id', (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan seluruhnya"
    });
});

// PATH: METHOD PATCH UNTUK MENYIMPAN SEBAGIAN DATA blog
routerBlog.patch('/blog/:id', (req, res) => {
    res.status(200).json({
        message: "Data sebagian berhasil disimpan"
    });
});

// PATH: METHOD DELETE UNTUK MENGHAPUS DATA blog SESUAI ID
routerBlog.delete('/blog/:id', (req, res) => {
    res.status(200).json({
        message: "Data berhasil dihapus"
    });
});