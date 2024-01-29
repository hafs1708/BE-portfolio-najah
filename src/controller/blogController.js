import { Prisma } from '../application/prisma.js';
import { Validate } from '../application/validate.js';
import { isID } from '../validation/mainValidation.js';
import { isBlog, isBlogTitle } from '../validation/blogValidation.js';
import { ResponseError } from '../error/responseError.js';
import dayjs from 'dayjs';

const formatData = (blog) => {
    const date = blog.craetedAt;
    blog.readDateTime = dayjs(date).format('DD MMM YYYY HH:mm:ss');
    blog.shortDateTime = dayjs(date).format('D MM YYYY HH:mm');
}

//  PATH: METHOD GET UNTUK MENGAMBIL DATA BLOG
const getAll = async (req, res, next) => {
    try {
        // PAGE
        const page = parseInt(req.query.page) || 1;

        // LIMIT
        const limit = parseInt(req.query.limit) || 10;

        // get total data
        const { data, total } = await getByPage(page, limit);
        const maxPage = Math.ceil(total / limit);

        // loop array


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

const getByPage = async (page = 1, limit = 10) => {
    // SKIP
    const skip = (page - 1) * limit;

    const data = await Prisma.blog.findMany({
        take: limit,
        skip: skip
    });

    // format data to get readble date time
    // lopp data 
    for (const blog of data) {
        formatData(blog);
    }

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

        // tanpa loop data
        formatData(blog);

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
        // untuk mengumpulkan photo
        const photos = [];
        if (req.files) {
            // loop photos
            for (const file of req.files) {
                // add slash to photo
                let photo = '/' + file.path.replaceAll("\\", "/");

                // buat object photo berdasarkan schema photo
                photo = {
                    path: photo
                };

                // push to photos
                photos.push(photo);
            }
        }

        let blog = req.body;

        // START JOI VALIDATE
        blog = Validate(isBlog, blog);

        // create blog beserta photos
        const data = await Prisma.blog.create({
            data: {
                ...blog, // duplicate object
                photos: {
                    create: photos
                }
            },
            include: {
                photos: true
            }
        });

        formatData(data);

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

        formatData(data);

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

        formatData(data);

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