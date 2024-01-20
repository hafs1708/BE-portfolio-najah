// LOAD ENV
import dotenv from 'dotenv'
dotenv.config();

import { Prisma } from "../application/prisma.js";
import { Validate } from "../application/validate.js";
import { ResponseError } from "../error/responseError.js";
import { loginValidation } from "../validation/authValidation.js";
import bycrpt from 'bcrypt';
import authService from "../service/authService.js";

// PATH: METHOD POST UNTUK LOGIN
const login = async (req, res, next) => {
    try {
        // ambil data body => email & password
        let loginData = req.body;
        const { email, password } = Validate(loginValidation, loginData);

        // check apakah user & email valid
        const user = await Prisma.user.findUnique({
            where: { email }
        });

        if (!user) throw new ResponseError(400, "Email or Password is invalid");

        // CHECK PASSWORD HASH
        const dbPassword = user.password;
        const checkPassword = await bycrpt.compare(password, dbPassword);

        if (!checkPassword) throw new ResponseError(400, "Email or Password is invalid");
        // console.log(data);
        // return;

        // CREATE TOKEN
        const token = authService.createToken(email, res)

        // UPDATE DATA USER, Masukkan ke token
        const data = await authService.updatedUserData(email, token);

        res.status(200).json({
            message: "Anda berhasil login",
            data,
            token
        });
    } catch (error) {
        next(error)
    }

};

// PATH: METHOD DELETE UNTUK LOGOUT
const logout = async (req, res, next) => {
    try {
        // UPDATE DATA USER -> Token is null
        const user = req.user;
        const email = user.email;

        await Prisma.user.update({
            where: { email },
            data: { token: null },
            select: { email: true }
        });

        // BUAT TOKEN UMUR 1 DETIK = 1s
        authService.createToken(email, res, '1s');
        console.log(user);

        // RESER COOKIE
        res.clearCookie('token');

        // SEND DATA SUCCESS
        res.status(200).json({
            message: "Success"
        });
    } catch (error) {
        next(error);
    }


};

export default {
    login,
    logout
}