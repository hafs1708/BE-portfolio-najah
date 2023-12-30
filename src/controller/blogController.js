import { Prisma } from '../application/prisma.js';

//  PATH: METHOD GET UNTUK MENGAMBIL DATA BLOG
const getAll = async (req, res) => {
    try {
        // FIND MANY -> ambil semua blog
        const blogs = await Prisma.blog.findMany();

        res.status(200).json({
            message: "Berhasil mendapatkan semua data blog",
            blogs: blogs
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error " + error.message
        })
    }
};

//  GET BY ID
const get = async (req, res) => {
    try {
        let id = req.params.id;

        if (!Number(id)) {
            return res.status(400).json({
                message: "ID is invalid"
            })
        }

        // if (isNaN(id)) {
        //     return res.status(400).json({
        //         message: "ID is invalid"
        //     })
        // }

        id = parseInt(id); // untuk parse ke integer

        const blog = await Prisma.blog.findUnique({
            where: {
                id: id
            }
        });

        // HANDLE NOT FOUND
        if (blog == null) {
            return res.status(404).json({
                message: `blog ${id} tidak ketemu`
            });
        }

        res.status(200).json({
            message: "Berhasil mendapatkan data blog berdasarkan id = " + id,
            blog: blog
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error " + error.message
        })
    }
};

// PATH: METHOD POST UNTUK MENYIMPAN DATA BLOG
const post = async (req, res) => {
    try {
        const blog = req.body;

        if (!blog.title || !blog.title) {
            return res.status(400).json({
                message: "Silahkan isi title & content"
            })
        }

        if (blog.title.length < 3) {
            return res.status(400).json({
                message: "Title minimal harus 3 karakter"
            });
        }

        if (blog.content.length < 3) {
            return res.status(400).json({
                message: "Content minimal harus 3 karakter"
            });
        }

        const newBlog = await Prisma.blog.create({
            data: blog
        });

        res.status(200).json({
            message: "Data berhasil disimpan",
            data: newBlog
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error " + error.message
        })
    }

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