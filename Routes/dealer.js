const express = require("express");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const DealerModel = require("../Models/dealers.model");

const SECRET = process.env["SECRET"];

const dealerRouter = express.Router();

dealerRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isExist = await DealerModel.findOne({ email });
    if (isExist) {
      return res.status(409).json({ error: "Dealer already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      throw new Error("Failed to hash password");
    }

    const user = new DealerModel({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error("An error occurred during registration:", error);
    res.status(500).json({ error: "An error occurred during registration" });
  }
});

dealerRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await DealerModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ dealerid: user._id }, SECRET);
          res.send({ msg: "Login Success", token });
        } else {
          console.log({ msg: "Invalid Password" });
          res.status(401).send({ msg: "Invalid Password", status: "invalidpassword" });
        }
      });
    } else {
      console.log({ msg: "Dealer Not Found" });
      res.status(401).send({ msg: "Dealer Not Found", status: "invalidemail" });
    }
  } catch (err) {
    console.log({ msg: "Error Occurred", error: err });
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

module.exports = dealerRouter;