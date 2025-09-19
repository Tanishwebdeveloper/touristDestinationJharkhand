import mongoose from "mongoose";

const userPaymentSchema=new mongoose.Schema({
    name:{
       type:String,
       required:true 
    } ,
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    cardNumber:{
        type:String,
        required:true
    },
    expiry:{
        type:String,
        required:true
    },
    cvv:{
        type:String,
        required:true
    },
    transactionmode:{
        type:String,
        required:true
    }
});

const UserPayment=mongoose.model("UserPayment",userPaymentSchema);

export default UserPayment;