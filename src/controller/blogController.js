import { Prisma } from '../application/prisma.js';
import { Validate } from '../application/validate.js';
import { isID } from '../validation/mainValidation.js';
import { isBlog, isBlogTitle } from '../validation/blogValidation.js';
import { ResponseError } from '../error/responseError.js';
import dayjs from 'dayjs';
import fileService from '../service/fileService.js';

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

        // SEARCH
        const search = req.query.search || '';

        // get total data
        const { data, total } = await getByPage(page, limit, search);
        const maxPage = Math.ceil(total / limit);

        // loop array


        res.status(200).json({
            data,
            page,
            total,
            limit,
            maxPage,
            search
        });
    } catch (error) {
        next(error);
    }
};

const getByPage = async (page = 1, limit = 10, search = '') => {
    // SKIP
    const skip = (page - 1) * limit;

    const data = await Prisma.blog.findMany({
        where: {
            title: {
                contains: search
            }
        },
        take: limit,
        skip: skip,
        include: {
            photos: true
        },
        orderBy: { createdAt: 'desc' }
    });

    // format data to get readble date time
    // lopp data 
    for (const blog of data) {
        formatData(blog);
    }

    // get total data
    const total = await Prisma.blog.count({
        where: {
            title: {
                contains: search
            }
        }
    });

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
            where: { id },
            include: {
                photos: true
            }
        });

        // HANDLE NOT FOUND
        if (blog == null) throw new ResponseError(404, `Blog dengan ${id} tidak ditemukan`);

        // tanpa loop data
        formatData(blog);

        res.status(200).json(blog);
    } catch (error) {
        next(error);
    }
};

// PATH: METHOD POST UNTUK MENYIMPAN DATA BLOG
const post = async (req, res, next) => {
    // console.log("masuk method post")
    try {
        // untuk mengumpulkan photo path
        const photos = fileService.getUploadPhotos(req);

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

        res.status(200).json(data);
    } catch (error) {
        // console.log(error);
        if (req.files) {
            // buang file jika error
            for (const file of req.files) {
                await fileService.removeFile(file.path)
            };
        }
        next(error);
    };
}

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
            include: {
                photos: true
            }
        });

        if (!currentBlog) throw new ResponseError(404, `Blog dengan ${id} tidak ditemukan`);

        // kumpulkan id photo yg existing
        const currentPhotos = currentBlog.photos.map(photo => photo.id);
        const idYangDipertahankan = blog.photos || []; // default array kosong

        // filter foto yg di pertahankan
        // current photos di filter berdasarkan id yang dipertahankan 
        const keepsPhoto = currentPhotos.filter(idPhoto => idYangDipertahankan.includes(idPhoto));
        // collect photo to be remove
        const photo_to_be_remove = currentBlog.photos.filter(photo => !idYangDipertahankan.includes(photo.id))

        // hapus variable photo
        delete blog.photos

        // simpan foto baru
        const newPhotos = fileService.getUploadPhotos(req);

        // update blog + delete photo yang tidak dipertahankan
        const data = await Prisma.blog.update({
            where: { id },
            data: {
                ...blog, // duplicate blog
                photos: {
                    deleteMany: {
                        id: {
                            notIn: keepsPhoto // delete yang tidak dipertahankan
                        }
                    },
                    create: newPhotos // add new photo
                }
            },
            include: {
                photos: true
            }
        });

        // remove unuse photo
        for (const photo of photo_to_be_remove) {
            await fileService.removeFile(photo.path)
        };

        formatData(data);

        res.status(200).json(data);
    } catch (error) {
        if (req.files) {
            // buang file jika error
            for (const file of req.files) {
                await fileService.removeFile(file.path)
            };
        }
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
            data: { title },
            include: {
                photos: true
            }
        });

        formatData(data);

        res.status(200).json(data);
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
            include: {
                photos: true
            }
        });

        if (!currentBlog) throw new ResponseError(404, `Blog dengan ${id} tidak ditemukan`);

        // EKSEKUSI DELETE
        await Prisma.blog.delete({
            where: { id },

        });

        // remove foto
        for (const photo of currentBlog.photos) {
            await fileService.removeFile(photo.path)
        };

        res.status(200).json({
            message: "SUCCESS"
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