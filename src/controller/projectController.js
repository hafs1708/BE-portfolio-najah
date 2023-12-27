//  PATH: METHOD GET UNTUK MENGAMBIL DATA project
const get = (req, res) => {
    // res.send('<p>Halaman Project</p>')

    res.status(200).json({
        cookies: req.cookies,
        test: "data test"
    })
};

// PATH: METHOD POST UNTUK MENYIMPAN DATA project
const post = (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan"
    });
};

// PATH: METHOD PUT UNTUK MENYIMPAN SELURUH DATA project
const put = (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan seluruhnya"
    });
};

// PATH: METHOD PATCH UNTUK MENYIMPAN SEBAGIAN DATA project
const patch = (req, res) => {
    res.status(200).json({
        message: "Data sebagian berhasil disimpan"
    });
};

// PATH: METHOD DELETE UNTUK MENGHAPUS DATA project SESUAI ID
const remove = (req, res) => {
    res.status(200).json({
        message: "Data berhasil dihapus"
    });
};

export default {
    get,
    post,
    put,
    patch,
    remove
}