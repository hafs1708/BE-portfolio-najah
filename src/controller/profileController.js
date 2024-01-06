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

// PATH: METHOD PUT UNTUK MENYIMPAN SELURUH DATA PROFILE
const put = (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan seluruhnya"
    });
};

export default {
    get,
    put
}