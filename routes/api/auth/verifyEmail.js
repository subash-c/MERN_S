const generateNumericOTP = require("../generateNumericOTP");
const TempUsers = require("../../../models/TempUsers");
const express=require("express")
const router=express.Router()

// send otp to verify email
router.post("/otp",async (req,res)=>{
    try {
        const {otp,otpExpiry,message,subject,sendEmail}=await generateNumericOTP();
        const email=req.body.email;
        const tempUser=new TempUsers({
            email,otp,
            otpExpiry

        })
        const id=tempUser.id;
        await tempUser.save()
        await sendEmail(email,subject,message)
        return res.json({msg:"OTP sent","id":id})

    }
    catch (err){
        console.log(err)
        return res.json({msg:"Couln't send OTP"})
    }
})

// verify email with the otp that user entered
router.post("/emailValidation",  async (req, res) => {
    try {
        const otpCheck = await TempUsers.findById(req.body.id).select({"otp":1, "otpExpiry":1});
        console.log(otpCheck,req.body.id,req.body.otp)
        const userEnteredOTP=parseInt(req.body.otp)
        if (otpCheck && otpCheck.otp === userEnteredOTP && otpCheck.otpExpiry > Date.now()) {
            // Valid OTP
            await TempUsers.findByIdAndDelete(req.body.id); // Clear the OTP after verification
            return res.send(true);
        }

        return res.send(false);
    } catch (err) {
        console.error("--->",err);
        return res.status(500).send("CS Server Error");
    }
});


module.exports = router;