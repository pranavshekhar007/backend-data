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
  pincode: {
    type: String,
  },
  address1:{
    type: String
  },
  address2:{
    type: String
  },

  //House Property Details
  houseProperty: {
    housePropertyType:{
      type: String,
      enum: ["self", "rented"],
    },
    pincode: {
      type: String,
    },
    address: {
      type: String,
    },
    estimatedRent: {
      type: String,
    },
    tenants: [
      {
        name: {type: String},
        pan: {type: String},
        rent: {type: String},
      },
    ],
    loanToken: {
      type:String,
      enum: ["yes", "no"],
      default: "no",
    },
    interestOnLoan: {
      type:String,
    },
    repairLoan: {
      type: String,
    },
    preConstructionInterest: {
      type: String,
    },
    propertyTaxPaid: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
    propertyTaxAmount: {
      type: String,
    },
  },
  
  // Deductions
  deductions: {
    lic: { type: String },
    pf: { type: String },
    ppf: { type: String },
    housingLoan: { type: String },
    fdr: { type: String },
    nsc: { type: String },
    tuitionFees: { type: String },
    annuityPremium: { type: String },
    otherDeductions: { type: String },
  },
});

itrSchema.plugin(timestamps);
module.exports = mongoose.model("Itr", itrSchema);
