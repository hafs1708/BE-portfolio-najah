import express from 'express';

export const routerSkill = express.Router();

routerSkill.get('/skill', (req, res) => {
    res.status(200).json({
        message: "Berhasil"
    });
});

// PATH: METHOD POST UNTUK MENYIMPAN DATA skill
routerSkill.post('/skill', (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan"
    });
});

// PATH: METHOD PUT UNTUK MENYIMPAN SELURUH DATA skill
routerSkill.put('/skill/:id', (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan seluruhnya"
    });
});

// PATH: METHOD PATCH UNTUK MENYIMPAN SEBAGIAN DATA skill
routerSkill.patch('/skill/:id', (req, res) => {
    res.status(200).json({
        message: "Data sebagian berhasil disimpan"
    });
});

// PATH: METHOD DELETE UNTUK MENGHAPUS DATA skill SESUAI ID
routerSkill.delete('/skill/:id', (req, res) => {
    res.status(200).json({
        message: "Data berhasil dihapus"
    });
});