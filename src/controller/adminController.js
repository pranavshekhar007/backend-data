const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendResponse } = require("../utils/common");
const Admin = require("../model/admin.Schema");

const adminController = express.Router();
const SECRET_KEY = process.env.JWT_KEY || "your_secret_key";

// Create Admin (Register)
adminController.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return sendResponse(res, 400, "Failed", { message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, email, password: hashedPassword });
    await newAdmin.save();

    sendResponse(res, 201, "Success", { message: "Admin registered successfully" });
  } catch (error) {
    sendResponse(res, 500, "Failed", { message: error.message || "Internal server error" });
  }
});

// Admin Sign In (Login)
adminController.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return sendResponse(res, 400, "Failed", { message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return sendResponse(res, 400, "Failed", { message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id, email: admin.email }, SECRET_KEY, { expiresIn: "1h" });

    sendResponse(res, 200, "Success", { message: "Login successful", token, data: admin, statusCode: 200 });
  } catch (error) {
    sendResponse(res, 500, "Failed", { message: error.message || "Internal server error" });
  }
});


// Get all Admins
adminController.get("/", async (req, res) => {
  try {
    const admins = await Admin.find({}, "-password"); // Exclude password field
    sendResponse(res, 200, "Success", { admins });
  } catch (error) {
    sendResponse(res, 500, "Failed", { message: error.message || "Internal server error" });
  }
});

// Get Admin by ID
adminController.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id, "-password"); // Exclude password field
    if (!admin) {
      return sendResponse(res, 404, "Failed", { message: "Admin not found" });
    }
    sendResponse(res, 200, "Success", { admin });
  } catch (error) {
    sendResponse(res, 500, "Failed", { message: error.message || "Internal server error" });
  }
});


module.exports = adminController;
