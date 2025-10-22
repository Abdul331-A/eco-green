import user from "../models/user.js"; // Keep this one
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
// import user from "../models/user.js"; // Remove or comment out this duplicate import


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

        const User = await user.create({ name, email, password: hashedPassWord }) // This 'User' (capital U) holds the new user data

        const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true, // prevent javascript to access cookie
            secure: process.env.NODE_ENV === 'production', // use secure cookie in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000,  //cookie expiration time (corrected to 60*1000 for seconds to ms)
        })

        // CORRECTED LINE: Access properties from the created 'User' object
        return res.json({ success: true, User: { email: User.email, name: User.name } }) // Removed password from response for security

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
};

//login user : /api/user/login

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;


        if (!email || !password)
            return res.json({ success: false, message: 'email and password are required' });

        const User = await user.findOne({ email });
        if (!User) { // Corrected 'user' to 'User'
            return res.json({ success: false, message: 'invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, User.password)
        if (!isMatch)
            return res.json({ success: false, message: 'invalid email or password' });
        const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true, // prevent javascript to access cookie
            secure: process.env.NODE_ENV === 'production', // use secure cookie in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000,  //cookie expiration time (corrected)
        })
        return res.json({ success: true, User: { email: User.email, name: User.name } }) // Removed password from response for security

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

//check auth : /api/user/is-auth
export const isAuth = async (req, res) => {
    try {
        console.log("req body::", req.body)
        const { userId } = req.body; // Assuming userId is passed in the body, or from a middleware if token is used
        // It's more common to get userId from the JWT token in a middleware after authentication
        const User = await user.findById(userId).select("-password")
        if (!User) {
            return res.json({ success: false, message: 'User not found' });
        }
        return res.json({ success: true, User })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

//logout user :/api/user/logout

export const logOut = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({ success: true, message: "logged out" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}


