import { Prisma } from "../application/prisma.js";
import { Validate } from "../application/validate.js";
import { ResponseError } from "../error/responseError.js";
import { isExperience } from "../validation/experienceValidation.js";
import { isID } from "../validation/mainValidation.js";

//  PATH: METHOD GET UNTUK MENGAMBIL DATA BLOG
const getAll = async (req, res, next) => {
    try {
        // FIND MANY -> ambil semua blog
        const experiences = await Prisma.experience.findMany();

        res.status(200).json({
            message: "Berhasil mendapatkan semua data experience",
            experiences
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

        const experience = await Prisma.experience.findUnique({
            where: { id }
        });

        // HANDLE NOT FOUND
        if (experience == null) throw new ResponseError(404, `Blog dengan ${id} tidak ditemukan`);

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
        let experince = req.body;

        experince = Validate(isExperience, experince);

        const data = await Prisma.experince.create({
            data: experince
        });

        res.status(200).json({
            message: "Data berhasil disimpan",
            data
        });
    } catch (error) {
        next(error)
    }

};

// PATH: METHOD PUT UNTUK MENYIMPAN SELURUH DATA experience
const put = async (req, res, next) => {
    try {
        let experience = req.body;
        let id = req.params.id;

        id = Validate(isID, id);

        experience = Validate(isExperience, experience);

        const currentExperience = await Prisma.experience.findUnique({
            where: { id },
            select: { id: true }
        });

        if (!currentExperience) throw new ResponseError(404, `Blog dengan ${id} tidak ditemukan`);

        const data = await Prisma.experience.update({
            where: { id }, data
        });

        res.status(200).json({
            message: "Data berhasil disimpan seluruhnya"
        });
    } catch (error) {
        next(error)
    }

};

// PATH: METHOD PATCH UNTUK MENYIMPAN SEBAGIAN DATA EXPERIENCE
const patch = (req, res, next) => {
    try {
        res.status(200).json({
            message: "Data sebagian berhasil disimpan"
        });
    } catch (error) {
        next(error)
    }

};

// PATH: METHOD DELETE UNTUK MENGHAPUS DATA EXPERIENCE SESUAI ID
const remove = async (req, res, next) => {
    try {
        let id = req.params.id;

        id = Validate(isID, id);

        const currentExperience = await Prisma.experience.findUnique({
            where: { id },
            select: { id: true }
        });

        if (!currentExperience) throw new ResponseError(404, `Blog dengan ${id} tidak ditemukan`);

        // EKSEKUSI DELETE
        await Prisma.experience.delete({
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
    remove
}