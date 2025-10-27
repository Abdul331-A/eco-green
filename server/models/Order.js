import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    userId: { type: String, require: true, ref: 'user' },
    items: [{
        product: { type: String, require: true, ref: 'product' },
        quantity: { type: Number, require: true }
    }],
    amount: { type: Number, require: true },
    addresss: { type: String, require: true, ref: 'address' },
    status: { type: String, default: 'order placed' },
    paymentType: { type: Boolean, require: true, default: false }
}, { timestamps: true })

const Order = mongoose.model.order || mongoose.model('order', orderSchema)

export default Order