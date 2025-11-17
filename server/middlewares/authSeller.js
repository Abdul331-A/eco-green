import jwt from 'jsonwebtoken';

const authSeller = async (req, res, next) => {
    
    const { sellerToken } = req.cookies
    console.log("seller token", sellerToken);
    if (!sellerToken) {
        return res.json({ success: false, message: 'not authorized' })
    }
    try {
        console.log("before decode")
        const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET)
        console.log(tokenDecode)
        if (tokenDecode.email === process.env.SELLER_EMAIL) {
            next();
        } else {
            return res.json({ success: false, message: '' })
        }

    } catch (error) {
        res.json({ success: false, message: error.message });
    }

}

export default authSeller;