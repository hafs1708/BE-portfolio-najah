import { Prisma } from "../application/prisma.js";
import { Validate } from "../application/validate.js";
import { isSkill } from "../validation/skillValidation.js";

//  PATH: METHOD GET UNTUK MENGAMBIL DATA SKILL
const getAll = async (req, res) => {
    const data = await Prisma.skill.findMany()
    res.status(200).json({
        message: "Berhasil"
    });
};

//  PATH: METHOD GET UNTUK MENGAMBIL DATA SKILL
const get = async (req, res) => {
    const data = await Prisma.skill.findMany()
    res.status(200).json({
        message: "Berhasil"
    });
};

// PATH: METHOD POST UNTUK MENYIMPAN DATA skill
const post = async (req, res, next) => {
    try {
        let data = req.body;

        // START JOI VALIDATE
        data = Validate(isSkill, data);

        // AMBIL ID CATEGORY => FIND OR CREATE
        const id_category = await find_or_create_skill_category(data.category);

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
            message: "Data berhasil disimpan"
        });
    } catch (error) {
        next(error);
    }
};

const find_or_create_skill_category = async (title) => {
    // KALO NGGAK ADA, MAKA BUAT CATEGORY
    // KALO ADA, LANGSUNG PASANGKAN

    // find category
    const category = await Prisma.skillCategory.findFirst({
        where: {
            title: title
        }
    });

    // jika ada, langsung return id
    if (category) return category.id;

    // or create category
    const newCategory = await Prisma.skillCategory.create({
        data: {
            title: title
        }
    });

    // return id yang baru
    return newCategory.id;
}

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