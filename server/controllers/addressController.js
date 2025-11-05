import Address from "../models/address.js"


//add address:/api/address/add
export const addAddress = async (req, res) => {
    console.log("added",addAddress);
    
    try {
        const { address, userId } = req.body
        await Address.create({ ...address, userId })

        
        res.json({ success: true, message: "address added suceesfully" })
        console.log(req.body);

        
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

//get address:/api/address/get
export const getAddress = async (req, res) => {
    console.log("get address",getAddress);
    
    try {
        const { userId } = req.body
        const addresses = await Address.find({ userId })
        res.json({ success: true, addresses })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}