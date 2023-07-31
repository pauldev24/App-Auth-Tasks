import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const authRequired = (req, res, next) => {
    const token = req.cookies.token
    if (!token) return res.status(401).json({ message: "Autorizacion denegada" })

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Usuario invalido" })

        //Si si existe un usuario
        req.user = user
        next()
    })
}
