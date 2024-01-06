import { Prisma } from "../application/prisma.js";

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
                firstName: "-",
                lastName: "-",
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
const put = (req, res) => {
    res.status(200).json({
        message: "Data berhasil disimpan seluruhnya"
    });
};

export default {
    get,
    put
}