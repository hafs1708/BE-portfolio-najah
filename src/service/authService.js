// LOAD ENV
import dotenv from 'dotenv'
dotenv.config();

import jwt from 'jsonwebtoken';
import { Prisma } from '../application/prisma.js';

// PECAH METHOD
// - CREATE TOKEN

const createToken = (email, res, age = process.env.SESSION_AGE) => {
    const jwtscreet = process.env.JWT_SCREET;
    // const maxAge = age ? age : process.env.SESSION_AGE;

    var token = jwt.sign({ email: email }, jwtscreet, {
        expiresIn: age
    });

    // CARA UNTUK KIRIM COOKIE KE CLIENT/BROWSER
    const maxAge = 24 * 60 * 60 * 1000;
    let cookieConfig = {
        maxAge: maxAge
    }
    res.cookie("token", token, cookieConfig);

    return token;
}

const updatedUserData = async (email, token) => {
    const data_user = await Prisma.user.update({
        where: { email },
        data: { token },
        select: {
            email: true,
            name: true,
        }
    });
    return data_user;
}

export default {
    createToken,
    updatedUserData
}