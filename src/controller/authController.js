import { Prisma } from "../application/prisma.js";
import { Validate } from "../application/validate.js";
import { ResponseError } from "../error/responseError.js";
import bycrpt from 'bcrypt';

// PATH: METHOD POST UNTUK LOGIN
const login = async (req, res, next) => {
    try {
        // ambil data body => email & password
        let loginData = req.body;
        loginData = Validate(loginValidation, loginData);

        // check apakah user & email valid
        const user = await Prisma.user.findUnique({
            where: {
                email: loginData.email
            }
        });

        // check password betul atau salah
        const clientPassword = loginData.password;
        const dbPassword = user.password;
        const checkPassword = await bycrpt.compare(clientPassword, dbPassword);

        if (!checkPassword) throw new ResponseError(400, "Email or Password is invalid");

        if (!user) throw new ResponseError(400, "Email or Password is invalid");

        res.cookie("token", "afhaudshfsnbaudshure");
        res.cookie("username", "Najah");
        res.cookie("lokasi", "Jakarta");

        res.status(200).json({
            message: "Anda berhasil login"
        })
    } catch (error) {
        next(error)
    }

};

// PATH: METHOD DELETE UNTUK LOGOUT
const logout = (req, res) => {
    res.clearCookie('lokasi');
    res.clearCookie('username');
    res.clearCookie('token');

    res.status(200).json({
        message: "Semua data di cookie berhasil di hapus"
    })
};

export default {
    login,
    logout
}