const mongoose = require("mongoose");
const dealerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    inventoryID: [{ type: mongoose.Schema.Types.ObjectId, ref: "Inventory" }],
  });
  
  module.exports =mongoose.model("Dealer", dealerSchema);