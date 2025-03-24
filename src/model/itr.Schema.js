const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const { type } = require("os");

const itrSchema = mongoose.Schema({
  userId:{
    type: String,
    required: true,
  },
  isSalary: {
    type: Boolean,
    required: true,
  },
  isHouseProperty: {
    type: Boolean,
    required: true,
  },
  isProfession: {
    type: Boolean,
    required: true,
  },
  isCapitalGain: {
    type: Boolean,
    required: true,
  },
  isOtherSource: {
    type: Boolean,
    required: true,
  },
  isForeignSource: {
    type: Boolean,
    required: true,
  },
});

itrSchema.plugin(timestamps);
module.exports = mongoose.model("Itr", itrSchema);
