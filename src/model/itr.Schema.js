const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const { type } = require("os");

const itrSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isSalary: {
    type: Boolean,
  },
  isHouseProperty: {
    type: Boolean,
  },
  isProfession: {
    type: Boolean,
  },
  isCapitalGain: {
    type: Boolean,
  },
  isOtherSource: {
    type: Boolean,
  },
  isForeignSource: {
    type: Boolean,
  },
  financialYear: {
    type: String,
  },
  panNumber: {
    type: String,
    unique: true,
  },
  dateOfBirth: {
    type: Date,
  },
});

itrSchema.plugin(timestamps);
module.exports = mongoose.model("Itr", itrSchema);
