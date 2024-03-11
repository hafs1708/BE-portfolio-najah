// LOAD ENV
import dotenv from 'dotenv'
dotenv.config();

import { Prisma } from "../application/prisma.js";
import { Validate } from "../application/validate.js";
import { ResponseError } from "../error/responseError.js";
import { createUserValidation, loginValidation, updateUserValidation } from "../validation/authValidation.js";
import bycrpt from 'bcrypt';
import authService from "../service/authService.js";
import Joi from 'joi';

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

        res.status(200).json(data);
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
        // console.log(user);

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

// GET USER DATA
const get = async (req, res, next) => {
    try {
        const user = await Prisma.user.findFirstOrThrow({
            select: {
                name: true,
                email: true
            }
        });

        res.status(200).json(user);

    } catch (error) {
        next(error);
    }
}

const put = async (req, res, next) => {
    try {
        let data = req.body;

        // validate
        data = Validate(updateUserValidation, data);
        // name, email, current_password, password, confirm_password

        // get current user
        const currentUser = await Prisma.user.findFirstOrThrow();

        // currentUser.password == current_password
        if (data.current_password) {
            const checkPassword = await bycrpt.compare(data.current_password, currentUser.password);
            if (!checkPassword) throw new ResponseError(400, 'current password is invalid');

            // remove confirm_password
            delete data.current_password;
            delete data.confirm_password;

            // updated password to hash
            data.password = await bycrpt.hash(data.password, 10)
        }

        const updatedUser = await Prisma.user.update({
            where: { email: currentUser.email },
            data: data,
            select: {
                name: true,
                email: true
            }
        });

        res.status(200).json(updatedUser);

        // <- apakah valuenya sama atau tidak
    } catch (error) {
        next(error)
    }
}

const createFirstUser = async (req, res, next) => {
    try {
        // cek apakah user sudah ada di database
        const checkUser = await Prisma.user.findFirst();

        if (checkUser != null) {
            res.status(403).json({
                message: 'User already exist'
            });

            next();
        } else {
            // validasi
            const data = Validate(createUserValidation, req.body);

            // buang confirm password
            delete data.confirm_password;

            // enkripsi password
            data.password = await bycrpt.hash(data.password, 10);

            // create user
            const user = await Prisma.user.create({
                data, 
                select: {
                    name: true,
                    email: true
                }
            });

            // create user
            res.status(200).json(user);
        }

    } catch (error) {
        next(error)
    }
}

export default {
    login,
    logout,
    get,
    put,
    createFirstUser
}