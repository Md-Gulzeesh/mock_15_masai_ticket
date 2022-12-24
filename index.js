require("dotenv").config();
const express = require("express");
const { connection } = require("./config/db");
const cors = require("cors");
const { loginRouter } = require("./routes/Login.route");
const { signUpRouter } = require("./routes/SignUp.route");
const { ticketRouter } = require("./routes/Ticket.routes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/login",loginRouter);
app.use("/signup",signUpRouter);
app.use("/tickets",ticketRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Db connected!");
  } catch (error) {
    console.log("Error while connecting to db");
    console.log(error);
  }
  console.log(`Server started on port ${process.env.PORT}`);
});
