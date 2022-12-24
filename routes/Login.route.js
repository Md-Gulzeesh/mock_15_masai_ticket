const express = require("express");
const { UserModel } = require("../models/User.model");
const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  try {
   const { Email, Password } = req.body;
   const user = await UserModel.find({ Email:Email,Password:Password });
   res.send(user);
  } catch (error) {
    res.status(404).send(error);
  }
});
module.exports = { loginRouter };
