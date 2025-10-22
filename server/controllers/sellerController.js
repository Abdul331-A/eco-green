
import jwt, { sign } from 'jsonwebtoken'


// login seller :/api/seller/login

export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (password === process.env.SELLLER_PASSWORD && email === process.env.SELLER_EMAIL) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expireIn: '7d' })
            res.cookie('sellerToken', token, {
                httpOnly: true, // prevent javascript to access cookie
                secure: process.env.NODE_ENV === 'production', // use secure cookie in production
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
                maxAge: 7 * 24 * 60 * 60 * 1000,  //cookie expiration time (corrected to 60*1000 for seconds to ms)
            });
            return res.json({ success: true, message: 'logged in' })
        } else {
            return res.json({ success: false, message: 'invalid credential' })
        }

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

//seller isAuth : /api/user/is-auth
export const isSellerAuth = async (req, res) => {
    try {
        
        return res.json({ success: true })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

//logout user :/api/user/logout

export const sellerLogOut = async (req, res) => {
    try {
        res.clearCookie('sellerToken', {
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