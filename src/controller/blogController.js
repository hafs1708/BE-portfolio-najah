import { join } from '@prisma/client/runtime/library.js';
import { Prisma } from '../application/prisma.js';
import Joi from 'joi';

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

        // START JOI  VALIDATE
        const schema = Joi.number().min(1).positive().required().label("ID");
        const validation = schema.validate(id);

        if (validation.error) {
            return res.status(400).json({
                message: validation.error.message
            });
        }
        id = validation.value;
        // END JOI VALIDATE

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
        let blog = req.body;
        let id = req.params.id;

        // START JOI VALIDATE ID
        const schema = Joi.number().min(1).positive().required().label("ID");
        const validation = schema.validate(id);

        if (validation.error) {
            return res.status(400).json({
                message: validation.error.message
            });
        }
        id = validation.value;
        // END JOI VALIDATE ID

        // START JOI VALIDATE
        const schemaBlog = Joi.object({
            title: Joi.string().trim().min(3).max(255).required().label("Title"),
            content: Joi.string().trim().min(3).required().label("Content")
        });

        const validateBlog = schemaBlog.validate(blog, {
            abortEarly: false
        });

        if (validateBlog.error) {
            return res.status(400).json({
                message: validateBlog.error.message
            });
        }
        blog = validateBlog.value;
        // END JOI VALIDATE

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
const put = async (req, res) => {
    try {
        let blog = req.body;
        let id = req.params.id;

        // START JOI VALIDATE ID
        const schema = Joi.number().min(1).positive().required().label("ID");
        const validation = schema.validate(id);

        if (validation.error) {
            return res.status(400).json({
                message: validation.error.message
            });
        }
        id = validation.value;
        // END JOI VALIDATE ID

        // START JOI VALIDATE
        const schemaBlog = Joi.object({
            title: Joi.string().trim().min(3).max(255).required().label("Title"),
            content: Joi.string().trim().min(3).required().label("Content")
        });

        const validateBlog = schemaBlog.validate(blog, {
            abortEarly: false
        });

        if (validateBlog.error) {
            return res.status(400).json({
                message: validateBlog.error.message
            });
        }
        blog = validateBlog.value;
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
        res.status(500).json({
            message: "Server error " + error.message
        });
    }
}

// PATH: METHOD PATCH UNTUK MENYIMPAN SEBAGIAN DATA blog
const updateTitle = async (req, res) => {
    try {
        let title = req.body.title;
        let id = req.params.id;

        // START JOI VALIDATE ID
        const schema = Joi.number().min(1).positive().required().label("ID");
        const validation = schema.validate(id);

        if (validation.error) {
            return res.status(400).json({
                message: validation.error.message
            });
        }
        id = validation.value;
        // END JOI VALIDATE ID

        // START JOI VALIDATE
        const schemaTitle = Joi.string().trim().min(3).max(255).required().label("Title");
        const validateTitle = schemaTitle.validate(title);

        if (validateTitle.error) {
            return res.status(400).json({
                message: validateTitle.error.message
            });
        }
        title = validateTitle.value;
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
            data: blog
        });

        res.status(200).json({
            message: "Data sebagian berhasil diubah",
            data: updateTitle
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error " + error.message
        });
    }

};

// PATH: METHOD DELETE UNTUK MENGHAPUS DATA blog SESUAI ID
const remove = async (req, res) => {
    try {
        let blog = req.body;
        let id = req.params.id;

        // START JOI VALIDATE ID
        const schema = Joi.number().min(1).positive().required().label("ID");
        const validation = schema.validate(id);

        if (validation.error) {
            return res.status(400).json({
                message: validation.error.message
            });
        }
        id = validation.value;
        // END JOI VALIDATE ID

        // START JOI VALIDATE
        const schemaBlog = Joi.object({
            title: Joi.string().trim().min(3).max(255).required().label("Title"),
            content: Joi.string().trim().min(3).required().label("Content")
        });

        const validateBlog = schemaBlog.validate(blog, {
            abortEarly: false
        });

        if (validateBlog.error) {
            return res.status(400).json({
                message: validateBlog.error.message
            });
        }
        blog = validateBlog.value;
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
        res.status(500).json({
            message: "Server error " + error.message
        });
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