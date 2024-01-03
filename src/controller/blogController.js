import { Prisma } from '../application/prisma.js';
import { Validate } from '../application/validate.js';
import { isID } from '../validation/mainValidation.js';
import { isBlog, isBlogTitle } from '../validation/blogValidation.js';
import { ResponseError } from '../error/responseError.js';

//  PATH: METHOD GET UNTUK MENGAMBIL DATA BLOG
const getAll = async (req, res, next) => {
    try {
        // FIND MANY -> ambil semua blog
        const blogs = await Prisma.blog.findMany();

        res.status(200).json({
            message: "Berhasil mendapatkan semua data blog",
            blogs: blogs
        });
    } catch (error) {
        next(error);
    }
};

//  GET BY ID
const get = async (req, res, next) => {
    try {
        let id = req.params.id;

        // VALIDATE ID
        id = Validate(isID, id);

        const blog = await Prisma.blog.findUnique({
            where: {
                id: id
            }
        });

        // HANDLE NOT FOUND
        if (blog == null) throw new ResponseError(404, `Blog dengan ${id} tidak ditemukan`);

        res.status(200).json({
            message: "Berhasil mendapatkan data blog berdasarkan id = " + id,
            blog: blog
        });
    } catch (error) {
        next(error);
    }
};

// PATH: METHOD POST UNTUK MENYIMPAN DATA BLOG
const post = async (req, res, next) => {
    try {
        let blog = req.body;

        // START JOI VALIDATE
        blog = Validate(isBlog, blog);

        const newBlog = await Prisma.blog.create({
            data: blog
        });

        res.status(200).json({
            message: "Data berhasil disimpan",
            data: newBlog
        });
    } catch (error) {
        next(error);
    }

};

// PATH: METHOD PUT UNTUK MENYIMPAN SELURUH DATA blog
const put = async (req, res, next) => {
    try {
        let blog = req.body;
        let id = req.params.id;

        // VALIDATE ID
        id = Validate(isID, id);

        // START JOI VALIDATE
        blog = Validate(isBlog, blog);

        const currentBlog = await Prisma.blog.findUnique({
            where: {
                id: id
            },
            select: {
                id: true
            }
        });

        if (!currentBlog) throw new ResponseError(404, `Blog dengan ${id} tidak ditemukan`);

        const updateData = await Prisma.blog.update({
            where: {
                id: id
            },
            data: blog
        });

        res.status(200).json({
            message: "Berhasil update data keseluruhan blog",
            data: updateData
        });
    } catch (error) {
        next(error);
    }
};

// PATH: METHOD PATCH UNTUK MENYIMPAN SEBAGIAN DATA blog
const updateTitle = async (req, res, next) => {
    try {
        let title = req.body.title;
        let id = req.params.id;

        // VALIDATE ID
        id = Validate(isID, id);

        // START JOI VALIDATE
        title = Validate(isBlogTitle, title);

        const currentBlog = await Prisma.blog.findUnique({
            where: {
                id: id
            },
            select: {
                id: true
            }
        });

        if (!currentBlog) throw new ResponseError(404, `Blog dengan ${id} tidak ditemukan`);

        // EKSEKUSI PATCH
        const updateTitle = await Prisma.blog.update({
            where: {
                id: id
            },
            data: {
                title: title
            }
        });

        res.status(200).json({
            message: "Data sebagian berhasil diubah",
            data: updateTitle
        });
    } catch (error) {
        next(error);
    }
};

// PATH: METHOD DELETE UNTUK MENGHAPUS DATA blog SESUAI ID
const remove = async (req, res, next) => {
    try {
        let id = req.params.id;

        // VALIDATE ID
        id = Validate(isID, id);

        const currentBlog = await Prisma.blog.findUnique({
            where: {
                id: id
            },
            select: {
                id: true
            }
        });

        if (!currentBlog) throw new ResponseError(404, `Blog dengan ${id} tidak ditemukan`);

        // EKSEKUSI DELETE
        await Prisma.blog.delete({
            where: {
                id: id
            }
        })

        res.status(200).json({
            message: "Data berhasil dihapus"
        });
    } catch (error) {
        next(error);
    }

};

export default {
    getAll,
    get,
    post,
    put,
    updateTitle,
    remove
}