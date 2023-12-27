//  PATH: METHOD GET UNTUK MENGAMBIL DATA EDUCATION
const get = (req, res) => {
    res.status(200).json({
        message: "Berhasil"
    });
};

// PATH: METHOD POST UNTUK MENYIMPAN DATA EDUCATION
const post = (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan"
    });
};

// PATH: METHOD PUT UNTUK MENYIMPAN SELURUH DATA EDUCATION
const put = (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan seluruhnya"
    });
};

// PATH: METHOD PATCH UNTUK MENYIMPAN SEBAGIAN DATA EDUCATION
const patch = (req, res) => {
    res.status(200).json({
        message: "Data sebagian berhasil disimpan"
    });
};

// PATH: METHOD DELETE UNTUK MENGHAPUS DATA EDUCATION SESUAI ID
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