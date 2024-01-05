// LOAD ENV
import dotenv from 'dotenv'
dotenv.config();

import jwt from 'jsonwebtoken';
import { Prisma } from '../application/prisma.js';

// PECAH METHOD
// - CREATE TOKEN

const createToken = (email, res, age) => {
    const jwtscreet = process.env.JWT_SCREET;
    const maxAge = age ? age : process.env.SESSION_AGE;

    var token = jwt.sign({ email: email }, jwtscreet, {
        expiresIn: maxAge
    });

    // CARA UNTUK KIRIM COOKIE KE CLIENT/BROWSER
    res.cookie("token", token);

    return token;
}

const updatedUserData = async (email, token) => {
    const data_user = await Prisma.user.update({
        where: {
            email: email
        },
        data: {
            token: token
        },
        select: {
            email: true,
            name: true,
            token: true
        }
    });

    return data_user;
}


export default {
    createToken,
    updatedUserData
}