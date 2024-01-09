import { Prisma } from "../application/prisma.js";
import jwt from "jsonwebtoken";
import authService from "../service/authService.js";

export const authMiddleware = async (req, res, next) => {
    try {
        // CHECK TOKEN FROM COOKIE
        const token = req.cookies.token
        if (!token) throw new Error();

        // CHECK USER BY TOKEN
        const user = await Prisma.user.findFirst({
            where: { token }
        });

        if (!user) throw new Error();

        // CHECK TOKEN EXPIRED
        const jwtscreet = process.env.JWT_SCREET;
        jwt.verify(token, jwtscreet);

        // UPDATE TOKEN
        const email = user.email
        const newToken = authService.createToken(email, res)

        // UPDATE USER TOKEN IN DB
        const updatedUserData = await authService.updatedUserData(email, newToken);

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