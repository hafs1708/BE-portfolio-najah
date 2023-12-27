import express from 'express';

const routerProfile = express.Router();

//  PATH: METHOD GET UNTUK MENGAMBIL DATA PROFILE
routerProfile.get('/profile', (req, res) => {
    res.status(200).json({
        message: "Berhasil"
    });
});

// PATH: METHOD POST UNTUK MENYIMPAN DATA PROFILE
routerProfile.post('/profile', (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan"
    });
});

// PATH: METHOD PUT UNTUK MENYIMPAN SELURUH DATA PROFILE
routerProfile.put('/profile/:id', (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan seluruhnya"
    });
});

// PATH: METHOD PATCH UNTUK MENYIMPAN SEBAGIAN DATA PROFILE
routerProfile.patch('/profile/:id', (req, res) => {
    res.status(200).json({
        message: "Data sebagian berhasil disimpan"
    });
});

// PATH: METHOD DELETE UNTUK MENGHAPUS DATA PROFILE SESUAI ID
routerProfile.delete('/profile/:id', (req, res) => {
    res.status(200).json({
        message: "Data berhasil dihapus"
    });
});


export { routerProfile };