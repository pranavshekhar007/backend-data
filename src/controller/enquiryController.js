const express = require("express");
const { sendResponse } = require("../utils/common");
const Enquiry = require("../model/enquiry.Schema");
const enquiryController = express.Router();

// Create Enquiry
enquiryController.post("/create", async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    sendResponse(res, 200, "Success", {
      message: "Enquiry created successfully!",
      data: enquiry,
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Failed", {
      message: error.message || "Internal Server Error",
      statusCode: 500,
    });
  }
});

// Get All Enquiries
enquiryController.get("/all", async (req, res) => {
  try {

    const {searchKey = "", sortByField = "createdAt", sortOrder = "-1" } = req.query;

    // construct search query
    const query = {};
    if(searchKey){
      query.$or = [
        { name: { $regex: searchKey, $options: "i" } },
        { email: { $regex: searchKey, $options: "i" } },
        { phone: { $regex: searchKey, $options: "i" } },
      ];
    }

    // construct sort object
    const sort = {};
    if (sortByField) {
      sort[sortByField] = parseInt(sortOrder);
    }

    const enquiries = await Enquiry.find(query).sort(sort);
    sendResponse(res, 200, "Success", {
      message: "All enquiries fetched successfully!",
      data: enquiries,
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Failed", {
      message: error.message || "Internal Server Error",
      statusCode: 500,
    });
  }
});

// Get Enquiry by ID
enquiryController.get("/:id", async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return sendResponse(res, 404, "Failed", {
        message: "Enquiry not found!",
        statusCode: 404,
      });
    }

    sendResponse(res, 200, "Success", {
      message: "Enquiry fetched successfully!",
      data: enquiry,
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Failed", {
      message: error.message || "Internal Server Error",
      statusCode: 500,
    });
  }
});

// Update Enquiry
enquiryController.put("/update/:id", async (req, res) => {
  try {
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedEnquiry) {
      return sendResponse(res, 404, "Failed", {
        message: "Enquiry not found!",
        statusCode: 404,
      });
    }

    sendResponse(res, 200, "Success", {
      message: "Enquiry updated successfully!",
      data: updatedEnquiry,
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Failed", {
      message: error.message || "Internal Server Error",
      statusCode: 500,
    });
  }
});

// Delete Enquiry
enquiryController.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await Enquiry.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return sendResponse(res, 404, "Failed", {
        message: "Enquiry not found!",
        statusCode: 404,
      });
    }

    sendResponse(res, 200, "Success", {
      message: "Enquiry deleted successfully!",
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Failed", {
      message: error.message || "Internal Server Error",
      statusCode: 500,
    });
  }
});

module.exports = enquiryController;
