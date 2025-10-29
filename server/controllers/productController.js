import { v2 as cloudinary } from "cloudinary"
import product from "../models/product.js"



//add product : /api/product/add
export const addProduct = async (req, res) => {
    try {

        let productData = JSON.parse(req.body.productData)

        const images = req.files

        let imageUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path,
                    { resource_type: 'image' });
                return result.secure_url
            })
        )
        console.log("image got", imageUrl);

        await product.create({ ...productData, images: imageUrl })
        res.json({ success: true, message: "product added" })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

//get product : /api/product/list
export const productList = async (req, res) => {
    try {
        const products = await product.find({})
        res.json({ success: true, products })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}
//get single product : /api/product/id
export const productById = async (req, res) => {
    try {
        const { id } = req.body
        const product = await product.find(id)
        res.json({ success: true, product })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}
//change product inStock : /api/product/stock
export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body
        await product.findByIdAndUpdate(id, { inStock })
        res.json({ success: true, message: 'stock updated' })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

//update in listed stock: /api/product/update/:id
export const updateStock = async (req, res) => {
    try {
        const { id } = req.params;

        const productData = req.body.productData
            ? JSON.parse(req.body.productData)
            : req.body;

        const images = req.files;
        let imageUrl = [];

        //if new image uploaded, send to the cloudinary
        if (images && images.length > 0) {
            imageUrl = await Promise.all(
                images.map(async (item) => {
                    const result = await cloudinary.uploader(item.path, {
                        resource_type: "image",

                    });
                    return result.secure_url;
                })
            )

        }

        //find the product
        const existingProduct = await product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ success: false, message: "product not found" });
        }

        //if new image upload
        const updateImages = imageUrl.length > 0 ? imageUrl : existingProduct.images;

        //update fields
        const updateProduct = await product.findByIdAndUpdate(
            id,
            {
                ...productData,
                images: updateImages,
            },
            { new: true }
        )
        res.json({ success: true, message: "product updated", product: updateProduct })

    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message })

    }
}
