import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: Array, require: true, unique: true },
    price: { type: String, required: true },
    offerPrice: { type: String, required: true },
    images: { type: Array, required: true },
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true }
}, { timestamps: true })

const product = mongoose.model.product || mongoose.model('product', productSchema)

export default product;