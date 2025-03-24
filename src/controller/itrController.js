const express = require("express");
const { sendResponse } = require("../utils/common");
require("dotenv").config();
const Itr = require("../model/itr.Schema");
const itrController = express.Router();
require("dotenv").config();

itrController.post("/create", async (req, res) => {
  try {
    const itrCreated = await Itr.create(req.body);
    sendResponse(res, 200, "Success", {
      message: "ITR created successfully!",
      data: itrCreated,
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Failed", {
      message: error.message || "Internal server error",
      statusCode: 500,
    });
  }
});
itrController.get("/list/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const itrList = await Itr.find({ userId: id });
    sendResponse(res, 200, "Success", {
      message: "ITR list retrived successfully!",
      data: itrList,
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Failed", {
      message: error.message || "Internal server error",
      statusCode: 200,
    });
  }
});
itrController.put("/update", async (req, res) => {
  try {
    const id = req.body._id;
    const itr = await Itr.findById(id);
    if (!itr) {
      return sendResponse(res, 404, "Failed", {
        message: "ITR not found",
        statusCode: 403,
      });
    }
    const updatedItr = await Itr.findByIdAndUpdate(id, req.body, {
      new: true, 
    });

    sendResponse(res, 200, "Success", {
      message: "ITR updated successfully!",
      data: updatedItr,
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Failed", {
      message: error.message || "Internal server error",
      statusCode: 500,
    });
  }
});
itrController.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const itr = await Itr.findById(id);
    if (!itr) {
      return sendResponse(res, 404, "Failed", {
        message: "ITR not found",
      });
    }
    await Itr.findByIdAndDelete(id);
    sendResponse(res, 200, "Success", {
      message: "ITR  deleted successfully!",
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Failed", {
      message: error.message || "Internal server error",
      statusCode: 200,
    });
  }
});

module.exports = itrController;
