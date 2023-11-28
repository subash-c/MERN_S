const express= require("express");
const router=express.Router();

const TempUsers=require("../../../models/TempUsers")
const User = require("../../../models/User");
const bcrypt = require("bcryptjs");




router.post("/validOtp",async (req,res) =>{
    try {
        const otpCheck = await TempUsers.findById(req.body.id);
        const userEnteredOTP=parseInt(req.body.otp)
        if (otpCheck && otpCheck.otp === userEnteredOTP && otpCheck.otpExpiry > Date.now()) {
            // Valid OTP
            const email=otpCheck.email;
            await TempUsers.findByIdAndDelete(req.body.id); // Clear the OTP after verification
            const user = await User.findOne({"email":email}).select("id");
            return res.json({
                id:user.id,
                isCorrect:true
            });

        }

        return res.json({
            id:null,
            isCorrect:false
        });
    } catch (err) {

        return res.status(500).send("CS Server Error");
    }
})

router.post("/resetPassword",async (req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        await User.findByIdAndUpdate(req.body.id,{
            "password":password
        })
        return res.json({
            "status":true,
            "msg":"Updated password"
        })
    }
    catch (err){
        res.json({
            "status":false,
            "msg":"Went wrong"
        })
    }
})

module.exports=router;