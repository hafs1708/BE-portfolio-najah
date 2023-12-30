import { Prisma } from '../application/prisma.js';

//  PATH: METHOD GET UNTUK MENGAMBIL DATA BLOG
const getAll = async (req, res) => {
    const blogs = await Prisma.blog.findMany();

    res.status(200).json({
        message: "Berhasil mendapatkan semua data blog",
        blogs: blogs
    });
};

//  GET BY ID
const get = async (req, res) => {
    let id = req.params.id;
    id = parseInt(id); // untuk parse ke integer

    const blog = await Prisma.blog.findUnique({
        where: {
            id: id
        }
    });

    // HANDLE NOT FOUND
    if (blog == null) {
        res.status(404).json({
            message: `blog ${id} tidak ketemu`
        });

    }

    res.status(200).json({
        message: "Berhasil mendapatkan data blog berdasarkan id = " + id,
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
    getAll,
    get,
    post,
    put,
    patch,
    remove
}