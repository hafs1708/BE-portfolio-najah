import { Prisma } from "../application/prisma.js";
import { Validate } from "../application/validate.js";
import { isEducation } from "../validation/educationValidation.js";
import { isID } from "../validation/mainValidation.js";

//  GET BY ID
const get = async (req, res, next) => {
    try {
        let id = req.params.id;

        id = Validate(isID, id);

        const education = await Prisma.education.findUnique({
            where: {
                id: id
            }
        });

        // HANDLE NOT FOUND
        if (education == null) {
            return res.status(404).json({
                message: `Education ${id} tidak ketemu`
            });
        }

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

        const newEducation = await Prisma.education.create({
            data: education
        });

        res.status(200).json({
            message: "Data berhasil disimpan",
            data: newEducation
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
            where: {
                id: id
            },
            select: {
                id: true
            }
        });

        if (!currentEducation) {
            return res.status(404).json({
                message: `Education dengan id ${id} tidak ditemukan`
            })
        };

        const updateData = await Prisma.education.update({
            where: {
                id: id
            },
            data: education
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
            where: {
                id: id
            },
            select: {
                id: true
            }
        });

        if (!currentEducation) {
            return res.status(404).json({
                message: `Education dengan id ${id} tidak ditemukan`
            })
        };

        // EKSEKUSI DELETE
        await Prisma.education.delete({
            where: {
                id: id
            }
        });

        res.status(200).json({
            message: "Data berhasil dihapus"
        });
    } catch (error) {
        next(error)
    }

};

export default {
    get,
    post,
    put,
    patch,
    remove
}