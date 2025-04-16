const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    pricing: { type: Number, required: true },
    image: { type: String },
    service: { type: String, required: true },
  },
  { timestamps: true }
);

const Pricing = mongoose.model("Pricing", priceSchema);

module.exports = Pricing;
