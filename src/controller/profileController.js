import { Prisma } from "../application/prisma.js";
import { Validate } from "../application/validate.js";
import fileService from "../service/fileService.js";
import { isCreateProfile, isUpdateProfile } from "../validation/profileValidation.js";
import blogController from "./blogController.js";
import educationController from "./educationController.js";
import experienceController from "./experienceController.js";
import projectController from "./projectController.js";
import skillController from "./skillController.js";
import dayjs from 'dayjs';

//  PATH: METHOD GET UNTUK MENGAMBIL DATA PROFILE
const get = async (req, res, next) => {
    try {
        const data = await getProfile();

        // KALO ADA ISINYA => KIRIM DATA ASLI
        res.status(200).json(data);

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

        let dataProfile = {};
        if (profile == null) {
            // JIKA NULL, MAKA BUAT DATA BARU - CERATE
            // Validasi
            data = Validate(isCreateProfile, data);

            dataProfile = await Prisma.profile.update({
                where: {
                    email: profile.email
                },
                data
            });

        } else {
            // JIKA ADA ISINYA, UPDATE DATA TERSEBUT - UPDATE
            data = Validate(isUpdateProfile, data)

            dataProfile = await Prisma.profile.update({
                where: { email: profile.email },
                data
            });
        }

        // hapus foto lama
        const avatar_lama = portfolio.avatar;
        const avatar_baru = dataProfile.avatar;
        if (avatar_lama) {
            if (avatar_lama != avatar_baru) {
                await fileService.removeFile(profile.avatar);
            }
        }

        res.status(200).json({ data: dataProfile });
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
        const experiences = await experienceController.getExperience();

        // education
        const educations = await educationController.getEducation();

        // skill by category
        const skills = await skillController.handleSkillByCategory();

        // blog
        const { data: blogs } = await blogController.getByPage(1, 4);

        // hitung jumlah project
        profile.count_project = projects.length;

        // calculate year of experience
        if (projects.length) {
            const firstProject = projects.findLast(p => true);
            const firstProjectDate = dayjs(firstProject.startDate);
            profile.year_of_experience = dayjs().diff(firstProjectDate, "year");
            profile.month_of_experience = dayjs().diff(firstProjectDate, "month");
        } else {
            // default
            profile.year_of_experience = 0;
            profile.month_of_experience = 0;
        }

        res.status(200).json({
            profile,
            projects,
            educations,
            experiences,
            skills,
            blogs
        });
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