import { Prisma } from '../application/prisma.js';

//  PATH: METHOD GET UNTUK MENGAMBIL DATA BLOG
const get = async (req, res) => {
    const blog = await Prisma.blog.findMany();

    res.status(200).json({
        message: "Berhasil",
        blog: blog
    });
};

// PATH: METHOD POST UNTUK MENYIMPAN DATA BLOG
const post = (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan"
    });
};

// PATH: METHOD PUT UNTUK MENYIMPAN SELURUH DATA blog
const put = (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan seluruhnya"
    });
};

// PATH: METHOD PATCH UNTUK MENYIMPAN SEBAGIAN DATA blog
const patch = (req, res) => {
    res.status(200).json({
        message: "Data sebagian berhasil disimpan"
    });
};

// PATH: METHOD DELETE UNTUK MENGHAPUS DATA blog SESUAI ID
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