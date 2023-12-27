import express from 'express';

export const routerAuth = express.Router();

// PATH: METHOD POST UNTUK LOGIN
routerAuth.post('/login', (req, res) => {
    res.cookie("token", "afhaudshfsnbaudshure");
    res.cookie("username", "Najah");
    res.cookie("lokasi", "Jakarta");

    res.status(200).json({
        message: "Anda berhasil login"
    })
});

// PATH: METHOD DELETE UNTUK LOGOUT
routerAuth.delete('/logout', (req, res) => {
    res.clearCookie('lokasi');
    res.clearCookie('username');
    res.clearCookie('token');

    res.status(200).json({
        message: "Semua data di cookie berhasil di hapus"
    })
});