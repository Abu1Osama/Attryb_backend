const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.SECRET;

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
          res.status(401).send({ msg: "Please Login Again", error: "token not found", status: "invalidtoken" });
        } else {
          req.body.dealerID = decoded.dealerID;
          next();
        }
      });
    } else {
      res.status(401).send({ msg: "Please Login Again", error: "token not found", status: "notoken" });
    }
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error", error, status: "error" });
    console.log("error: ", error);
  }
};

module.exports = authMiddleware;