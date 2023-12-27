// PATH: METHOD POST UNTUK LOGIN
const login = (req, res) => {
    res.cookie("token", "afhaudshfsnbaudshure");
    res.cookie("username", "Najah");
    res.cookie("lokasi", "Jakarta");

    res.status(200).json({
        message: "Anda berhasil login"
    })
};

// PATH: METHOD DELETE UNTUK LOGOUT
const logout = (req, res) => {
    res.clearCookie('lokasi');
    res.clearCookie('username');
    res.clearCookie('token');

    res.status(200).json({
        message: "Semua data di cookie berhasil di hapus"
    })
};

export default {
    login,
    logout
}