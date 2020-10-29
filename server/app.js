const express = require("express");
require("dotenv/config");
const userRouter = require("./api/users");
const tokenRouter = require("./api/token");
const authRouter = require("./api/auth");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
app.use(cors());

//Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/user", userRouter);
app.use("/api/token", tokenRouter);
app.use("/api/auth", authRouter);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Invoice application." });
});

app.listen("7000", () => {
  console.log("server started on port 7000");
});
