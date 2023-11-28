
const mongoose = require("mongoose");

const TempUserSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
    },


    otp:{
        type:Number,
        required:true

    },
    otpExpiry:{
        type:Date,
        required:true
    }

});

const TempUsers = mongoose.model("tempUser", TempUserSchema);

module.exports = TempUsers;
