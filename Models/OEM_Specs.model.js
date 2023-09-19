const mongoose = require("mongoose");

const oemSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: String, required: true },
    colors: { type: [String], required: true },
    prices: { type: [Number], required: true },
    power: { type: Number, required: true },
    maxSpeed: { type: Number, required: true },
    mileage: { type: Number, required: true },
  },
  { versionKey: false, timestamps: true }
);

oemSchema.index({ model: "text", year: "text" });

module.exports = mongoose.model("oemSpecs", oemSchema);
