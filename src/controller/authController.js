import { Prisma } from "../application/prisma.js";
import { Validate } from "../application/validate.js";
import { ResponseError } from "../error/responseError.js";
import { loginValidation } from "../validation/authValidation.js";
import bycrpt from 'bcrypt';
import jwt from "jsonwebtoken";

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

        if (!user) throw new ResponseError(400, "Email or Password is invalid");

        // CHECK PASSWORD HASH
        const clientPassword = loginData.password;
        const dbPassword = user.password;
        const checkPassword = await bycrpt.compare(clientPassword, dbPassword);

        if (!checkPassword) throw new ResponseError(400, "Email or Password is invalid");

        // CREATE TOKEN
        const jwtscreet = process.env.JWT_SCREET;
        const maxAge = 60 * 60 // 1 jam
        var token = jwt.sign({ email: user.email }, jwtscreet, {
            expiresIn: maxAge
        });

        // CARA UNTUK KIRIM COOKIE KE CLIENT/BROWSER
        res.cookie("token", token);

        // UPDATE DATA USER, Masukkan ke token
        const data = await Prisma.user.update({
            where: {
                email: loginData.email
            },
            data: {
                token: token
            },
            select: {
                name: true,
                email: true
            }
        });

        res.status(200).json({
            message: "Anda berhasil login",
            data: data,
            token: token
        });
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