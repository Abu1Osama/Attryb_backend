const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./Controller/db");
const inventoryRouter = require("./Routes/Inventory");
const dealerRouter = require("./Routes/dealer");
const oemRouter = require("./Routes/OEM_Specs");
const authMiddleware = require("./Middleware/Auth");

dotenv.config();
connectDB()
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.use("/dealer", dealerRouter);
app.use("/oemspec", authMiddleware, oemRouter);
app.use("/inventory", authMiddleware, inventoryRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
