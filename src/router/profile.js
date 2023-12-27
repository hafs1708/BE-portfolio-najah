import express from 'express';

const routerProfile = express.Router();

//  PATH: METHOD GET UNTUK MENGAMBIL DATA PROFILE
app.get('/profile', (req, res) => {
    res.status(200).json({
        message: "Berhasil"
    });
});

// PATH: METHOD POST UNTUK MENYIMPAN DATA PROFILE
app.post('/profile', (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan"
    });
});

// PATH: METHOD PUT UNTUK MENYIMPAN SELURUH DATA PROFILE
app.put('/profile/:id', (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan seluruhnya"
    });
});

// PATH: METHOD PATCH UNTUK MENYIMPAN SEBAGIAN DATA PROFILE
app.patch('/profile/:id', (req, res) => {
    res.status(200).json({
        message: "Data sebagian berhasil disimpan"
    });
});

// PATH: METHOD DELETE UNTUK MENGHAPUS DATA PROFILE SESUAI ID
app.delete('/profile/:id', (req, res) => {
    res.status(200).json({
        message: "Data berhasil dihapus"
    });
});


export { routerProfile };