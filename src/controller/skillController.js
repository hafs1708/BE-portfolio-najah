import { Prisma } from "../application/prisma.js";

//  PATH: METHOD GET UNTUK MENGAMBIL DATA SKILL
const get = async (req, res) => {
    const data = await Prisma.skill.findMany()
    res.status(200).json({
        message: "Berhasil"
    });
};

// PATH: METHOD POST UNTUK MENYIMPAN DATA skill
const post = (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan"
    });
};

// PATH: METHOD PUT UNTUK MENYIMPAN SELURUH DATA skill
const put = (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan seluruhnya"
    });
};

// PATH: METHOD PATCH UNTUK MENYIMPAN SEBAGIAN DATA skill
const patch = (req, res) => {
    res.status(200).json({
        message: "Data sebagian berhasil disimpan"
    });
};

// PATH: METHOD DELETE UNTUK MENGHAPUS DATA skill SESUAI ID
const remove = (req, res) => {
    res.status(200).json({
        message: "Data berhasil dihapus"
    });
};

export default {
    getAll,
    get,
    post,
    put,
    patch,
    remove
}