import { Prisma } from '../application/prisma.js';
import { Validate } from '../application/validate.js';
import { isID } from '../validation/mainValidation.js';
import { isBlog, isBlogTitle } from '../validation/blogValidation.js';
import { ResponseError } from '../error/responseError.js';

//  PATH: METHOD GET UNTUK MENGAMBIL DATA BLOG
const getAll = async (req, res, next) => {
    try {
        // PAGE
        const page = parseInt(req.query.page) || 1;

        // LIMIT
        const limit = parseInt(req.query.limit) || 10;

        // get total data
        const { data, total } = await getByPage(limit, skip);
        const maxPage = Math.ceil(total / limit);

        res.status(200).json({
            message: "Berhasil mendapatkan semua data blog",
            data,
            page,
            total,
            limit,
            maxPage
        });
    } catch (error) {
        next(error);
    }
};

const getByPage = async (page, limit) => {
    // SKIP
    const skip = (page - 1) * limit;

    const data = await Prisma.blog.findMany({
        take: limit,
        skip: skip
    });

    // get total data
    const total = await Prisma.blog.count();

    return {
        data,
        total
    }
}

//  GET BY ID
const get = async (req, res, next) => {
    try {
        let id = req.params.id;

        // VALIDATE ID
        id = Validate(isID, id);

        const blog = await Prisma.blog.findUnique({
            where: { id }
        });

        // HANDLE NOT FOUND
        if (blog == null) throw new ResponseError(404, `Blog dengan ${id} tidak ditemukan`);

        res.status(200).json({
            message: "Berhasil mendapatkan data blog berdasarkan id = " + id,
            blog
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

        const data = await Prisma.blog.create({
            data: blog
        });

        res.status(200).json({
            message: "Data berhasil disimpan",
            data
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
            where: { id },
            select: { id: true }
        });

        if (!currentBlog) throw new ResponseError(404, `Blog dengan ${id} tidak ditemukan`);

        const data = await Prisma.blog.update({
            where: { id },
            data: blog
        });

        res.status(200).json({
            message: "Berhasil update data keseluruhan blog",
            data
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
            where: { id },
            select: { id: true }
        });

        if (!currentBlog) throw new ResponseError(404, `Blog dengan ${id} tidak ditemukan`);

        // EKSEKUSI PATCH
        const data = await Prisma.blog.update({
            where: { id },
            data: { title }
        });

        res.status(200).json({
            message: "Data sebagian berhasil diubah",
            data
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
            where: { id },
            select: { id: true }
        });

        if (!currentBlog) throw new ResponseError(404, `Blog dengan ${id} tidak ditemukan`);

        // EKSEKUSI DELETE
        await Prisma.blog.delete({
            where: { id }
        });

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
    remove,
    getByPage
}