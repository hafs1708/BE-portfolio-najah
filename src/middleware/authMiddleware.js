import { Prisma } from "../application/prisma";
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
        const jwtscreet = 'TOKENPORTFOLIONAJAH';
        jwt.verify(token, jwtscreet);

        // UPDATE TOKEN
        // const maxAge = 60 * 60 // 1 jam
        const maxAge = 10; // 10 detik
        var newtoken = jwt.sign({ email: user.email }, jwtscreet, {
            expiresIn: maxAge
        });

        // CARA UNTUK KIRIM COOKIE KE CLIENT/BROWSER
        res.cookie("token", newtoken);

        // UPDATE USER TOKEN IN DB
        await Prisma.user.update({
            where: {
                email: user.email
            },
            data: {
                token: newtoken
            }
        });

        next();
    } catch (error) {
        // hapus cookie di client / browser / postman 
        res.clearCookie('token');

        return res.status(401).json({
            message: "Anda belom login"
        })
    }
};