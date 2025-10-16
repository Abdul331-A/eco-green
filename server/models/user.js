import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{Types:String,required:true},
    cartItem:{Types:String,required:true}
},{minimize:false})

const user=mongoose.model.user || mongoose.model('user',userSchema)

export default user;
