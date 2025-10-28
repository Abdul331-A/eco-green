import Order from "../models/Order.js"
import product from "../models/product.js"


// place order COD : /api/order/cod
export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, item: items, address } = req.body
        if (!address || items.length === 0) {
            return res.json({ success: false, message: "invalid data" })
        }
        //calculate amount using items
        let amount = await items.reduce(async (acc, item) => {
            const Product = await product.findById({ item, product });
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)
        //add tax charge (2%)
        amount += Math.floor(amount * 0.02)

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD"
        })
        res.json({ success: true, message: "order place successfully" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

//get orders by user id : /api/order/user
export const getUserOrder = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await Order.find({
            userId,
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 });
        res.json({ success: true, order: orders })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// get all Orders (for seller / admin): /api/orders/seller
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 });
        res.json({ success: true, order: orders })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}