import { Prisma } from "../application/prisma.js";
import { Validate } from "../application/validate.js";
import { ResponseError } from "../error/responseError.js";
import { isID } from "../validation/mainValidation.js";

//  PATH: METHOD GET UNTUK MENGAMBIL DATA project
const getAll = async (req, res, next) => {
    try {
        // FIND MANY -> ambil semua blog
        const projects = await Prisma.project.findMany();

        res.status(200).json({
            message: "Berhasil mendapat data project keseluruhan",
            data: projects
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

        const project = await Prisma.project.findUnique({
            where: {
                id: id
            }
        });

        // HANDLE NOT FOUND
        if (project == null) throw new ResponseError(404, `Project dengan ${id} tidak ditemukan`);

        res.status(200).json({
            message: "Berhasil mendapat data project berdasarkan id",
            data: project
        });

    } catch (error) {
        next(error)
    }
};

// PATH: METHOD POST UNTUK MENYIMPAN DATA project
const post = (req, res, next) => {
    try {
        res.status(200).json({
            message: "Data berhasil disimpan"
        });
    } catch (error) {
        next(error);
    }
};

// PATH: METHOD PUT UNTUK MENYIMPAN SELURUH DATA project
const put = (req, res, next) => {
    try {
        res.status(200).json({
            message: "Data berhasil disimpan seluruhnya"
        });
    } catch (error) {
        next(error);
    }
};

// PATH: METHOD DELETE UNTUK MENGHAPUS DATA project SESUAI ID
const remove = (req, res, next) => {
    try {
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
    remove
}