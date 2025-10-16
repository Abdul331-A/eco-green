import user from "../models/user.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
//register user :/api/user/register
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: 'missing details' })
        }

        const existingUser = await user.findOne({ email })

        if (existingUser)
            return res.json({ success: false, message: 'user already exissting' })

        const hashedPassWord = await bcrypt.hash(password, 10)

        const User = await user.create({ name, email, password: hashedPassWord })

        const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true, // prevent javascript to access cookie
            secure: process.env.NODE_ENV === 'production', // use secure cookie in production 
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
            maxAge: 7 * 24 * 60 * 1000,  //cookie expiration time
        })

        return res.json({ success: true, User:{email:user.email,name:user.name} })

    } catch (error) {

    }
}