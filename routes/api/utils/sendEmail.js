const config=require("config")
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: config.get("email"),
        pass: config.get("pass")
    },
});

const sendEmail = async (to, subject, html) => {
    const mailOptions = {
        from: config.get("email"),
        to,
        subject,
        html,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};


module.exports=sendEmail;