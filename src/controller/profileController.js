//  PATH: METHOD GET UNTUK MENGAMBIL DATA PROFILE
const get = (req, res) => {
    // ambil data dari database
    const data = {
        firstname: "Faiqis",
        lastname: "Rahmany",
        email: "faiqisrahmany@gmail.com",
        age: 19
    };

    res.status(200).json({
        message: "Berhasil",
        data: data
    });
};

// PATH: METHOD POST UNTUK MENYIMPAN DATA PROFILE
const post = (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan"
    });
};

// PATH: METHOD PUT UNTUK MENYIMPAN SELURUH DATA PROFILE
const put = (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan seluruhnya"
    });
};

// PATH: METHOD PATCH UNTUK MENYIMPAN SEBAGIAN DATA PROFILE
const patch = (req, res) => {
    res.status(200).json({
        message: "Data sebagian berhasil disimpan"
    });
};

// PATH: METHOD DELETE UNTUK MENGHAPUS DATA PROFILE SESUAI ID
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