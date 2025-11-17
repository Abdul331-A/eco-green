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
        const prod = await product.find(id)
        res.json({ success: true, product:prod })
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
              console.log("check id",id);

        const productData = req.body.productData
            ? JSON.parse(req.body.productData)
            : req.body;

        const images = req.files;
        let imageUrl = [];

        console.log("imagesssss",images);
        

        //if new image uploaded, send to the cloudinary
        if (images && images.length > 0) {
            console.log("inside images>>>>")
            imageUrl = await Promise.all(
                images.map(async (item) => {
                    const result = await cloudinary.uploader.upload(item.path, {
                        resource_type: "image",

                    });
                    console.log("clodnry result",result);
                    
                    return result.secure_url;
                })
            )
            
        }
        console.log("images url ", imageUrl);
        

        //find the product
        const existingProduct = await product.findById(id);
  
        console.log("check anothor",existingProduct);
        
        
        if (!existingProduct) {
            return res.status(404).json({ success: false, message: "product not found" });
        }

        //if new image upload
        const updateImages = imageUrl.length > 0 ? imageUrl : existingProduct.images;

        console.log("updateed",updateImages);
        

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

// delete product in list : /api/product/delete/:id

export const deleteProduct=async (req,res)=>{

    try {
        const {id}=req.params
        

        console.log("idd::",id);
        

        const target = await product.findByIdAndDelete(id);
        
        if(!target){
            return res.json({success:false,message:"product not found"});
        }
        res.json({success:true,message:"product successfully deleted"})
    } catch (error) {
        console.error("Error removing product:", error);
        res.json({ success: false, message: "Failed to delete product." });
    }
}