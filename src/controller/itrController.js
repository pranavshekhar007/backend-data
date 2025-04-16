const express = require("express");
const { sendResponse } = require("../utils/common");
require("dotenv").config();
const Itr = require("../model/itr.Schema");
const itrController = express.Router();
require("dotenv").config();

// Create Itr
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

// update itr
itrController.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updateQuery = { $set: {} };

    Object.keys(updateData).forEach((key) => {
      if (key === 'createdAt') return;

      updateQuery.$set[key] = updateData[key];
    });
    const updatedItr = await Itr.findByIdAndUpdate(id, updateQuery, { new: true });

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


// Get all ITRs
itrController.get("/all", async (req, res) => {
  try {
    const { searchKey = "", sortByField = "createdAt", sortOrder = "-1" } = req.query;

    // Construct search query
    const query = {};
    if (searchKey) {
      query.$or = [
        { firstName: { $regex: searchKey, $options: "i" } },
        { middleName: { $regex: searchKey, $options: "i" } },
        { lastName: { $regex: searchKey, $options: "i" } },
      ];
    }

    // Construct sort object
    const sort = {};
    if (sortByField) {
      sort[sortByField] = parseInt(sortOrder); // 1 for ASC, -1 for DESC
    }

    const itrs = await Itr.find(query).sort(sort);

    sendResponse(res, 200, "Success", {
      message: "ITRs fetched successfully!",
      data: itrs,
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


// Get ITR by ID
itrController.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const itr = await Itr.findById(id);

    if (!itr) {
      return sendResponse(res, 404, "Failed", {
        message: "ITR not found!",
        statusCode: 404,
      });
    }

    sendResponse(res, 200, "Success", {
      message: "ITR fetched successfully!",
      data: itr,
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

// Delete ITR
itrController.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItr = await Itr.findByIdAndDelete(id);

    if (!deletedItr) {
      return sendResponse(res, 404, "Failed", {
        message: "ITR not found!",
        statusCode: 404,
      });
    }

    sendResponse(res, 200, "Success", {
      message: "ITR deleted successfully!",
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
