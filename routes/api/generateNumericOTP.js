const sendEmail = require("./utils/sendEmail")


const generateNumericOTP = async () => {

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);


    const message = `
            <p>Hello friend,</p>
            
            <p>Here is the OTP for verification:</p>
            
            <h2>${otp}</h2>
            
            <p>This OTP is valid for a limited time. If you did not request, please ignore this email.</p>
            <p>This is an automated mail for verification, please don't reply</p>
            
            <p>Best regards,<br>C.S Industries</p>
            `
    const subject="OTP for verification"
    return {otp, otpExpiry, message,subject, sendEmail}
}



module.exports=generateNumericOTP;