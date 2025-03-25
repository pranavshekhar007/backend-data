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
  firstName: {
    type: String,
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  fatherName: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: "male",
  },
});

itrSchema.plugin(timestamps);
module.exports = mongoose.model("Itr", itrSchema);
