import { Prisma } from "../application/prisma.js";
import { Validate } from "../application/validate.js";
import { ResponseError } from "../error/responseError.js";
import { isEducation } from "../validation/educationValidation.js";
import { isID } from "../validation/mainValidation.js";

//  PATH: METHOD GET UNTUK MENGAMBIL DATA BLOG
const getAll = async (req, res, next) => {
    try {
        // PAGE
        const page = parseInt(req.query.page) || 1;

        // LIMIT
        const limit = parseInt(req.query.limit) || 10;

        // SKIP
        const skip = (page - 1) * limit;

        // get total data
        const { data, total } = await getByPage(limit, skip);
        const maxPage = Math.ceil(total / limit);

        res.status(200).json({
            message: "Berhasil mendapatkan semua data education",
            data,
            page,
            total,
            limit,
            maxPage
        });

        // // FIND MANY -> ambil semua blog
        // const educations = await Prisma.education.findMany();

        // res.status(200).json({
        //     message: "Berhasil mendapatkan semua data education",
        //     educations
        // });
    } catch (error) {
        next(error);
    }
};

const getByPage = async (limit, skip) => {
    const data = await Prisma.education.findMany({
        take: limit,
        skip: skip
    });

    // get total data
    const total = await Prisma.education.count();

    return {
        data,
        total
    }
}

//  GET BY ID
const get = async (req, res, next) => {
    try {
        let id = req.params.id;

        id = Validate(isID, id);

        const education = await Prisma.education.findUnique({
            where: { id }
        });

        // HANDLE NOT FOUND
        if (education == null) throw new ResponseError(404, `Education dengan ${id} tidak ditemukan`);

        res.status(200).json({
            message: "Berhasil"
        });
    } catch (error) {
        next(error)
    }

};

// PATH: METHOD POST UNTUK MENYIMPAN DATA EDUCATION
const post = async (req, res, next) => {
    try {
        let education = req.body;

        education = Validate(isEducation, education);

        const data = await Prisma.education.create({
            data: education
        });

        res.status(200).json({
            message: "Data berhasil disimpan",
            data
        });
    } catch (error) {
        next(error)
    }

};

// PATH: METHOD PUT UNTUK MENYIMPAN SELURUH DATA EDUCATION
const put = async (req, res, next) => {
    try {
        let education = req.body;
        let id = req.params.id;

        id = Validate(isID, id);

        education = Validate(isEducation, education);

        const currentEducation = await Prisma.education.findUnique({
            where: { id },
            select: { id: true }
        });

        if (!currentEducation) throw new ResponseError(404, `Blog dengan ${id} tidak ditemukan`);

        const data = await Prisma.education.update({
            where: { id }, data
        });

        res.status(200).json({
            message: "Data berhasil disimpan seluruhnya"
        });
    } catch (error) {
        next(error)
    }

};

// PATH: METHOD PATCH UNTUK MENYIMPAN SEBAGIAN DATA EDUCATION
const patch = (req, res, next) => {
    try {
        res.status(200).json({
            message: "Data sebagian berhasil disimpan"
        });
    } catch (error) {
        next(error)
    }

};

// PATH: METHOD DELETE UNTUK MENGHAPUS DATA EDUCATION SESUAI ID
const remove = async (req, res, next) => {
    try {
        let id = req.params.id;

        id = Validate(isID, id);

        const currentEducation = await Prisma.education.findUnique({
            where: { id },
            select: { id: true }
        });

        if (!currentEducation) throw new ResponseError(404, `Blog dengan ${id} tidak ditemukan`);

        // EKSEKUSI DELETE
        await Prisma.education.delete({
            where: { id }
        });

        res.status(200).json({
            message: "Data berhasil dihapus"
        });
    } catch (error) {
        next(error)
    }

};

export default {
    getAll,
    get,
    post,
    put,
    patch,
    remove,
    getByPage
}