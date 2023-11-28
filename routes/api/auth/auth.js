const express = require("express");

const app=express();

app.use("/",require("./login"))
app.use("/email",require("./verifyEmail"))
app.use("/forgotPassword",require("./forgotPassword"));


module.exports=app;


