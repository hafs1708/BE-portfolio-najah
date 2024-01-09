import { Prisma } from "../application/prisma.js";
import { Validate } from "../application/validate.js";
import { isProfile } from "../validation/profileValidation.js";

//  PATH: METHOD GET UNTUK MENGAMBIL DATA PROFILE
const get = async (req, res, next) => {
    try {
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
                address: "-"
            };
        }

        // KALO ADA ISINYA => KIRIM DATA ASLI
        res.status(200).json({
            message: "Berhasil ambil data profile",
            data: profile
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
        // validasi
        data = Validate(isProfile, data)

        let dataProfile = {};
        if (!profile) {
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

        res.status(200).json({
            message: "Data berhasil disimpan seluruhnya",
            data: dataProfile
        });
    } catch (error) {
        next(error);
    }
};

export default {
    get,
    put
}