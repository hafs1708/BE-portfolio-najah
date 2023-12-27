import express from 'express';

export const routerEducation = express.Router();

//  PATH: METHOD GET UNTUK MENGAMBIL DATA EDUCATION
routerEducation.get('/education', (req, res) => {
    res.status(200).json({
        message: "Berhasil"
    });
});

// PATH: METHOD POST UNTUK MENYIMPAN DATA EDUCATION
routerEducation.post('/education', (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan"
    });
});

// PATH: METHOD PUT UNTUK MENYIMPAN SELURUH DATA EDUCATION
routerEducation.put('/education/:id', (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan seluruhnya"
    });
});

// PATH: METHOD PATCH UNTUK MENYIMPAN SEBAGIAN DATA EDUCATION
routerEducation.patch('/education/:id', (req, res) => {
    res.status(200).json({
        message: "Data sebagian berhasil disimpan"
    });
});

// PATH: METHOD DELETE UNTUK MENGHAPUS DATA EDUCATION SESUAI ID
routerEducation.delete('/education/:id', (req, res) => {
    res.status(200).json({
        message: "Data berhasil dihapus"
    });
});