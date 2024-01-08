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
const put = async (req, res, next) => {
    try {
        let skill = req.body;
        let id = req.params.id;

        // VALIDATE ID
        id = Validate(isID, id);

        // START JOI VALIDATE
        skill = Validate(isSkill, blog);

        const currentSkill = await Prisma.skill.findUnique({
            where: {
                id: id
            },
            select: {
                id: true
            }
        });

        if (!currentSkill) throw new ResponseError(404, `Skill dengan ${id} tidak ditemukan`);

        // handle category dahulu
        const category_id = await skillService.find_or_create_skill_category(skill, category);

        const update_data = {
            title: skill.title,
            skillCategoryId: category_id
        }

        const updateSkill = await Prisma.skill.update({
            where: {
                id: id
            },
            data: update_data
        });

        res.status(200).json({
            message: "Berhasil update data skill",
            data: updateSkill
        });
    } catch (error) {
        next(error)
    }
};

// PATH: METHOD DELETE UNTUK MENGHAPUS DATA skill SESUAI ID
const remove = async (req, res) => {
    try {
        let id = req.params.id;

        // VALIDATE ID
        id = Validate(isID, id);

        const currentSkill = await Prisma.skill.findUnique({
            where: {
                id: id
            },
            select: {
                id: true
            }
        });

        if (!currentSkill) throw new ResponseError(404, `Skill dengan ${id} tidak ditemukan`);

        // EKSEKUSI DELETE
        await Prisma.skill.delete({
            where: {
                id: id
            }
        });

        res.status(200).json({
            message: "Data skill berhasil dihapus"
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