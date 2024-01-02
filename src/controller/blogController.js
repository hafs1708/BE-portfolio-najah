import { join } from '@prisma/client/runtime/library.js';
import { Prisma } from '../application/prisma.js';
import { Validate } from '../application/validate.js';
import Joi from 'joi';
import { isID } from '../validation/mainValidation.js';

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
        id = Validate(isID, id);

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
        next(error);
    }
};

// PATH: METHOD POST UNTUK MENYIMPAN DATA BLOG
const post = async (req, res, next) => {
    try {
        let blog = req.body;

        // START JOI VALIDATE
        const schemaBlog = Joi.object({
            title: Joi.string().trim().min(3).max(255).required().label("Title"),
            content: Joi.string().trim().min(3).required().label("Content")
        });
        blog = Validate(schemaBlog, blog);
        // END JOI VALIDATE

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
        id = Validate(isID, id);

        // START JOI VALIDATE
        const schemaBlog = Joi.object({
            title: Joi.string().trim().min(3).max(255).required().label("Title"),
            content: Joi.string().trim().min(3).required().label("Content")
        });
        blog = Validate(schemaBlog, blog);
        // END JOI VALIDATE

        const currentBlog = await Prisma.blog.findUnique({
            where: {
                id: id
            },
            select: {
                id: true
            }
        });

        if (!currentBlog) {
            return res.status(404).json({
                message: `Blog dengan id ${id} tidak ditemukan`
            })
        }

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
        id = Validate(isID, id);

        // START JOI VALIDATE
        const schemaTitle = Joi.string().trim().min(3).max(255).required().label("Title");
        title = Validate(schemaTitle, title);
        // END JOI VALIDATE

        const currentBlog = await Prisma.blog.findUnique({
            where: {
                id: id
            },
            select: {
                id: true
            }
        });

        if (!currentBlog) {
            return res.status(404).json({
                message: `Blog dengan id ${id} tidak ditemukan`
            })
        };

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
        id = Validate(isID, id);

        const currentBlog = await Prisma.blog.findUnique({
            where: {
                id: id
            },
            select: {
                id: true
            }
        });

        if (!currentBlog) {
            return res.status(404).json({
                message: `Blog dengan id ${id} tidak ditemukan`
            })
        };

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