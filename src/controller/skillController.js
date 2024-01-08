import { Prisma } from "../application/prisma.js";
import { Validate } from "../application/validate.js";
import { ResponseError } from "../error/responseError.js";
import skillService from "../service/skillService.js";
import { isID } from "../validation/mainValidation.js";
import { isSkill } from "../validation/skillValidation.js";

//  PATH: METHOD GET UNTUK MENGAMBIL DATA SKILL
const getAll = async (req, res) => {
    const data = await Prisma.skill.findMany({
        include: {
            category: true
        }
    })
    res.status(200).json({
        message: "Berhasil mendapat data skill",
        data: data
    });
};

//  PATH: METHOD GET UNTUK MENGAMBIL DATA SKILL
const get = async (req, res, next) => {
    try {
        let id = req.params.id;

        // VALIDATE ID
        id = Validate(isID, id);

        const skill = await Prisma.skill.findUnique({
            where: {
                id: id
            },
            include: {
                category: true
            }
        });

        // HANDLE NOT FOUND
        if (skill == null) throw new ResponseError(404, `Skill dengan ${id} tidak ditemukan`);

        res.status(200).json({
            message: "Berhasil mendapat data skill",
            data: skill
        });
    } catch (error) {
        next(error)
    }
};

// PATH: METHOD POST UNTUK MENYIMPAN DATA skill
const post = async (req, res, next) => {
    try {
        let data = req.body;

        // START JOI VALIDATE
        data = Validate(isSkill, data);

        // AMBIL ID CATEGORY => FIND OR CREATE
        // const id_category = await find_or_create_skill_category(data.category);
        const id_category = await skillService.find_or_create_skill_category(data.category);

        // CREATE SKILL
        // buat data skill yang mau di simpan
        const insert_data = {
            title: data.title,
            skillCategoryId: id_category
        }
        const skill_data = await Prisma.skill.create({
            data: insert_data
        });

        res.status(200).json({
            message: "Data berhasil disimpan",
            data: skill_data
        });
    } catch (error) {
        next(error);
    }
};

// PATH: METHOD PUT UNTUK MENYIMPAN SELURUH DATA skill
const put = (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan seluruhnya"
    });
};

// PATH: METHOD PATCH UNTUK MENYIMPAN SEBAGIAN DATA skill
const patch = (req, res) => {
    res.status(200).json({
        message: "Data sebagian berhasil disimpan"
    });
};

// PATH: METHOD DELETE UNTUK MENGHAPUS DATA skill SESUAI ID
const remove = (req, res) => {
    res.status(200).json({
        message: "Data berhasil dihapus"
    });
};

export default {
    getAll,
    get,
    post,
    put,
    patch,
    remove
}