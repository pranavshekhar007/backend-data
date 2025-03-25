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

itrController.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItr = await Itr.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedItr) {
      return sendResponse(res, 404, "Failed", {
        message: "ITR not found!",
        statusCode: 404,
      });
    }

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



module.exports = itrController;
