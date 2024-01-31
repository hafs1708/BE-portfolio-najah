import dayjs from "dayjs";
import { Prisma } from "../application/prisma.js";
import { Validate } from "../application/validate.js";
import { ResponseError } from "../error/responseError.js";
import { isID } from "../validation/mainValidation.js";
import { isProject } from "../validation/projectValidation.js";
import fileService from "../service/fileService.js";

const formatData = (project) => {
    // Start Date
    const startDate = project.startDate;
    project.readStartDate = dayjs(startDate).format('DD MMMM YYYY');

    // End Date
    if (project.endDate) {
        const endDate = project.endDate;
        project.readEndDate = dayjs(endDate).format('DD MMMM YYYY');
    } else {
        project.readEndDate = 'Present';
    }
}

//  PATH: METHOD GET UNTUK MENGAMBIL DATA project
const getAll = async (req, res, next) => {
    try {
        // PAGE
        const page = parseInt(req.query.page) || 1;

        // LIMIT
        const limit = parseInt(req.query.limit) || 10;


        // get total data
        const { data, total } = await getByPage(page, limit)
        const maxPage = Math.ceil(total / limit);

        res.status(200).json({
            message: "Berhasil mendapat data project keseluruhan",
            data,
            total,
            page,
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

    const data = await Prisma.project.findMany({
        take: limit,
        skip: skip,
        include: {
            photos: true
        }
    });

    for (const project of data) {
        formatData(project);
    }

    // get total data
    const total = await Prisma.project.count();

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

        const data = await Prisma.project.findUnique({
            where: { id },
            include: {
                photos: true
            }
        });

        // HANDLE NOT FOUND
        if (data == null) throw new ResponseError(404, `Project dengan ${id} tidak ditemukan`);

        formatData(data);

        res.status(200).json({
            message: "Berhasil mendapat data project berdasarkan id",
            data
        });

    } catch (error) {
        next(error)
    }
};

// PATH: METHOD POST UNTUK MENYIMPAN DATA project
const post = async (req, res, next) => {
    try {
        // untuk mengumpulkan photo path
        const photos = fileService.getUploadPhotos(req);

        let project = req.body;

        // START JOI VALIDATE
        project = Validate(isProject, project);

        const data = await Prisma.project.create({
            data: {
                ...project, // duplicate object
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
            message: "Berhasil Menyimpan Data Project",
            data
        });
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
            where: { id },
            include: {
                photos: true
            }
        });

        if (!currentProject) throw new ResponseError(404, `Project dengan ${id} tidak ditemukan`);

        // kumpulkan id photo yg existing
        const currentPhotos = currentProject.photos.map(photo => photo.id);
        const idYangDipertahankan = project.photos || []; // default array kosong

        // filter foto yg di pertahankan
        // current photos di filter berdasarkan id yang dipertahankan 
        const keepsPhoto = currentPhotos.filter(idPhoto => idYangDipertahankan.includes(idPhoto));

        // hapus variable photo
        delete project.photos

        // simpan foto baru
        const newPhotos = fileService.getUploadPhotos(req);

        const data = await Prisma.project.update({
            where: { id },
            data: {
                ...project, // duplicate blog
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

        formatData(currentProject);

        res.status(200).json({
            message: "Berhasil update data keseluruhan project",
            data
        });
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

// PATH: METHOD DELETE UNTUK MENGHAPUS DATA project SESUAI ID
const remove = async (req, res, next) => {
    try {
        let id = req.params.id;

        // VALIDATE ID
        id = Validate(isID, id);

        const currentProject = await Prisma.project.findUnique({
            where: { id },
            select: { id: true }
        });

        // Check Current
        if (!currentProject) throw new ResponseError(404, `Project dengan ${id} tidak ditemukan`);

        // EKSEKUSI DELETE
        await Prisma.project.delete({
            where: { id }
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
    remove,
    getByPage
}