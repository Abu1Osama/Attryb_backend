const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    dealer: { type: mongoose.Schema.Types.ObjectId, ref: "dealer" },
    oemSpecs: { type: mongoose.Schema.Types.ObjectId, ref: "oemSpecs" },
    image: { type: String, required: true },
    desc: { type: [String], required: true },
    kmsOdometer: { type: Number, required: true },
    scratches: { type: Boolean, default: false },
    accidents: { type: Number, default: 0 },
    prevBuyers: { type: Number, default: 0 },
    originalPaint: { type: Boolean, default: true },
    price: { type: Number, default: 0 },
    regPlace: { type: String, required: true },
  },
  { versionKey: false, timestamp: true }
);
inventorySchema.index({ title: "text", desc: "text" });
module.exports = mongoose.model("Inventory", inventorySchema);
