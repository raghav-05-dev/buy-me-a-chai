"use server"
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import User from "@/models/User"
import connectDb from "@/db/connectDb"

export const initiate = async(amount, to_username, paymentform)=>{
    await connectDb()
    var instance = new Razorpay({ key_id: process.env.NEXT_PUBLIC_KEY_ID , key_secret:process.env.KEY_SECRET})

    let options = {
        amount: Number(amount) * 100,
        currency: "INR",
    }
    let x = await instance.orders.create(options)
    await Payment.create({oid: x.id, amount: Number(amount), to_user: to_username, name: paymentform.name, message: paymentform.message})
    return x
}

export const fetchuser = async (username) =>{
    await connectDb()
    let u = await User.findOne({username: username})
    let user = u.toObject({flattenObjectIds: true})
    return JSON.parse(JSON.stringify(u))
}

export const fetchpayments = async (username) =>{
    await connectDb()
    let p = await Payment.find({to_user: username}).sort({amount: -1}).lean()
    return JSON.parse(JSON.stringify(p))
}