import { Prisma } from "../application/prisma.js";
import { Validate } from "../application/validate.js";
import fileService from "../service/fileService.js";
import { isProfile } from "../validation/profileValidation.js";
import blogController from "./blogController.js";
import educationController from "./educationController.js";
import experienceController from "./experienceController.js";
import projectController from "./projectController.js";

//  PATH: METHOD GET UNTUK MENGAMBIL DATA PROFILE
const get = async (req, res, next) => {
    try {
        const data = await getProfile();

        // KALO ADA ISINYA => KIRIM DATA ASLI
        res.status(200).json({
            message: "Berhasil ambil data profile",
            data
        });

    } catch (error) {
        next(error);
    }

};

// PATH: METHOD PUT UNTUK MENYIMPAN SELURUH DATA PROFILE
const put = async (req, res, next) => {
    try {
        // GET DATA PROFILE DARI DB, FIND FIRST
        const profile = await Prisma.profile.findFirst();

        // Collect data & validate
        let data = req.body;

        // check apakah ada data file
        if (req.file) {
            const avatar = '/' + req.file.path.replaceAll('\\', '/')
            data.avatar = avatar;
        }

        // validasi
        data = Validate(isProfile, data)

        let dataProfile = {};
        if (!dataProfile) {
            // JIKA NULL, MAKA BUAT DATA BARU - CERATE
            dataProfile = await Prisma.profile.create({
                data
            });

        } else {
            // JIKA ADA ISINYA, UPDATE DATA TERSEBUT - UPDATE
            dataProfile = await Prisma.profile.update({
                where: { email: profile.email },
                data
            });
        }

        // hapus foto lama

        if (profile.avatar) {
            await fileService.removeFile(profile.avatar);
        }

        res.status(200).json({
            message: "Data berhasil disimpan seluruhnya",
            data: dataProfile
        });
    } catch (error) {
        // jika error && ada file, maka file di hapus
        console.log("handle error")
        if (req.file) {
            // handle buang file
            fileService.removeFile(req.file.path)
        }
        next(error);
    }
};


const portfolio = async (req, res, next) => {
    try {
        // ambil data profile
        const profile = await getProfile();

        // project // 4
        // extract variable data menjadi variable project
        const { data: projects } = await projectController.getByPage(1, 4);

        // experience
        const experience = await experienceController.getExperience();

        // education
        const education = await educationController.getEducation();

        // skill by category

        // blog
        const { data: blogs } = await blogController.getByPage(1, 4);

        res.status(200).json({
            message: "Berhasil ambil data portfolio",
            data: {
                profile,
                projects,
                blogs,
                experience,
                education
            }

        })

    } catch (error) {
        next(error);
    }
}


const getProfile = async () => {
    // CEK KE DATABASE
    let profile = await Prisma.profile.findFirst();

    // JIKA KOSONG => KIRIM DATA DUMMY
    if (!profile) {
        // buat data dummy
        profile = {
            email: "example@gmail.com",
            firstname: "-",
            lastname: "-",
            dob: "1900-01-01",
            address: "-",
            job: "-",
            city: "-",
            country: "-"
        };
    }
    return profile;
}


export default {
    get,
    put,
    portfolio,
}