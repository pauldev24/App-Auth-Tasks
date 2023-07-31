import User from '../models/user_model.js'
import { con } from '../db.js'
import bcrypt from 'bcryptjs'
import { createAccesssToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const register = async (req, res) => {
    const { username, email, password } = req.body

    //Validar si el usuario ya existe
    const [userFound] = await con.query("SELECT * FROM users WHERE email = ?", email);

    if (userFound.length > 0) return res.status(400).json({ message: "Usuario ya registrado con ese correo" });

    try {
        const passwordHash = await bcrypt.hash(password, 10)//Nos dara un string aleatorio
        //Creamos nuevo usuario
        const newUser = new User(
            username,
            email,
            passwordHash)

        //Realizamos la peticion
        const [userSaved] = await con.query(
            "INSERT INTO users SET ?",
            newUser
        );

        const token = await createAccesssToken({ id: userSaved.insertId })
        res.cookie("token", token)
        //Obtenemos el resultado de datos
        res.json({
            id: userSaved.insertId,
            username,
            email,
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const [userFound] = await con.query("SELECT * FROM users WHERE email = ?", email);

        //Validar si lo encontro
        if (userFound.length == 0) return res.status(400).json({ message: ["Usuario no encontrado"] })

        //Ahora comparar passwords encryptadas
        const isMatch = await bcrypt.compare(password, userFound[0].password)

        if (!isMatch) return res.status(400).json({ message: ["Contraseña incorrecta"] })

        const token = await createAccesssToken({ id: userFound[0].id })
        res.cookie("token", token, { secure: true, sameSite: "none" })
        //Enviamos el resultado de datos
        res.json({
            id: userFound[0].id,
            username: userFound[0].username,
            email: userFound[0].email,
            created_at: userFound[0].created_at,
            updated_at: userFound[0].updated_at
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

export const logout = async (req, res) => {
    res.cookie("token", "", { expires: new Date(0) })
    return res.sendStatus(200)
}

export const profile = async (req, res) => {
    const [userFound] = await con.query("SELECT * FROM users WHERE id = ?", req.user.id);

    if (!userFound) return res.status(400).json({ message: ["Usuario no encontrado"] })

    //Si encontro el usuario devuelve sus datos
    res.json({
        id: userFound[0].id,
        username: userFound[0].username,
        email: userFound[0].email,
        created_at: userFound[0].created_at,
        updated_at: userFound[0].updated_at
    })
}

export const verifyToken = async (req, res) => {
    try {
        const {token} = req.cookies

        if (!token) return res.status(401).json({ message: "No Autorizado" })

        jwt.verify(token, TOKEN_SECRET, async (err, user) => {
            if (err) return res.status(401).json({ message: "No Autorizado" })

            const userFound = await con.query("SELECT * FROM users WHERE id = ?", user.id);

            res.json({ id: userFound[0].id, username: userFound[0].username, email: userFound[0].email })
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
