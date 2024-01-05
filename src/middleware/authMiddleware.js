import { Prisma } from "../application/prisma.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    try {
        console.log("PROSES CEK AUTHENTICATION");

        // CHECK TOKEN FROM COOKIE
        const token = req.cookies.token
        if (!token) throw new Error();

        // CHECK USER BY TOKEN
        const user = await Prisma.user.findFirst({
            where: {
                token: token
            }
        });

        if (!user) throw new Error();

        // CHECK TOKEN EXPIRED
        const jwtscreet = process.env.JWT_SCREET;
        jwt.verify(token, jwtscreet);

        // UPDATE TOKEN
        const maxAge = 60 * 60 // 1 jam
        var newtoken = jwt.sign({ email: user.email }, jwtscreet, {
            expiresIn: maxAge
        });

        // CARA UNTUK KIRIM COOKIE KE CLIENT/BROWSER
        res.cookie("token", newtoken);

        // UPDATE USER TOKEN IN DB
        const updatedUserData = await Prisma.user.update({
            where: {
                email: user.email
            },
            data: {
                token: newtoken
            },
            select: {
                email: true,
                name: true,
                token: true
            }
        });

        // TAMBAHKAN DATA USER KE REQ
        // DIGUNAKAN KETIKA DIBUTUHKAN
        req.user = updatedUserData;

        next();
    } catch (error) {
        // hapus cookie di client / browser / postman 
        res.clearCookie('token');

        return res.status(401).json({
            message: "Anda belom login"
        })
    }
};