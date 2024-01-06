import { Prisma } from "../application/prisma.js";
import { Validate } from "../application/validate.js";
import { ResponseError } from "../error/responseError.js";
import { isID } from "../validation/mainValidation.js";
import { isProject } from "../validation/projectValidation.js";

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
const post = async (req, res, next) => {
    try {
        let project = req.body;

        // START JOI VALIDATE
        project = Validate(isProject, project);

        const newProject = await Prisma.project.create({
            data: project
        });

        res.status(200).json({
            message: "Berhasil Menyimpan Data Project",
            data: newProject
        });
    } catch (error) {
        next(error);
    }
};

// PATH: METHOD PUT UNTUK MENYIMPAN SELURUH DATA project
const put = async (req, res, next) => {
    try {
        let project = req.body;
        let id = req.params.id;

        // VALIDATE ID
        id = Validate(isID, id);

        // START JOI VALIDATE
        project = Validate(isProject, project);

        const currentProject = await Prisma.project.findUnique({
            where: {
                id: id
            },
            select: {
                id: true
            }
        });

        if (!currentProject) throw new ResponseError(404, `Project dengan ${id} tidak ditemukan`);

        const updateData = await Prisma.project.update({
            where: {
                id: id
            },
            data: project
        });

        res.status(200).json({
            message: "Berhasil update data keseluruhan project",
            data: updateData
        });
    } catch (error) {
        next(error);
    }
};

// PATH: METHOD DELETE UNTUK MENGHAPUS DATA project SESUAI ID
const remove = async (req, res, next) => {
    try {
        let id = req.params.id;

        // VALIDATE ID
        id = Validate(isID, id);

        const currentProject = await Prisma.project.findUnique({
            where: {
                id: id
            },
            select: {
                id: true
            }
        });

        if (!currentProject) throw new ResponseError(404, `Project dengan ${id} tidak ditemukan`);

        // EKSEKUSI DELETE
        await Prisma.project.delete({
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
    remove
}