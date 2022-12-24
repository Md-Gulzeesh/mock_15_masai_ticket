const express = require("express");
const { UserModel } = require("../models/User.model");
const signUpRouter = express.Router();

signUpRouter.post("/", async (req, res) => {
 try {
    let user = await UserModel.find({Email:req.body.Email});
    if(user.length === 0){
         await UserModel.insertMany([req.body]);
         res.send("SignUp successfully");
    }else{
        res.status(409).send("User already exists");
    }
 } catch (error) {
    res.status(500).send(error);
 }
});
module.exports = { signUpRouter };
