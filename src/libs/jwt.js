import { TOKEN_SECRET } from '../config.js'
import jwt from 'jsonwebtoken'

export function createAccesssToken(data) {
    //Creamos un jwt
    return new Promise((resolve, reject) => {
        jwt.sign(
            data,
            TOKEN_SECRET,
            {
                expiresIn: "1d"
            },
            (error, token) => {
                if (error) reject(error);
                resolve(token)
            }
        )
    })

}