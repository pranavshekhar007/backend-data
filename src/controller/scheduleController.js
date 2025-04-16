const express = require("express");
const { sendResponse } = require("../utils/common");
const Schedule = require("../model/schedule.Schema");
const scheduleController = express.Router();

// Create Schedule
scheduleController.post("/create", async (req, res) => {
    try {
      const { enquiryId, date, time, message } = req.body;
      
      if (!enquiryId || !date || !time || !message) {
        return sendResponse(res, 400, "Failed", {
          message: "All fields are required.",
          statusCode: 400,
        });
      }
  
      const schedule = await Schedule.create(req.body);
      sendResponse(res, 200, "Success", {
        message: "Schedule created successfully!",
        data: schedule,
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
  

// Get All Schedules
// Get All Schedules
scheduleController.get("/all", async (req, res) => {
  try {
    const {
      searchKey = "",
      sortByField = "createdAt",
      sortOrder = "-1",
      status = "", // Add status filter
    } = req.query;

    const sort = {};
    if (sortByField) {
      sort[sortByField] = parseInt(sortOrder);
    }

    // Build base query object
    const query = {};
    if (status) {
      query.status = status; // Filter by status if provided
    }

    // Fetch filtered schedules with populated enquiry
    let schedules = await Schedule.find(query).sort(sort).populate("enquiryId");

    // If there's a searchKey, filter manually on enquiry fields
    if (searchKey) {
      const lowerSearch = searchKey.toLowerCase();
      schedules = schedules.filter((sch) => {
        const enquiry = sch.enquiryId;
        return (
          enquiry?.name?.toLowerCase().includes(lowerSearch) ||
          enquiry?.email?.toLowerCase().includes(lowerSearch) ||
          enquiry?.phone?.toLowerCase().includes(lowerSearch)
        );
      });
    }

    sendResponse(res, 200, "Success", {
      message: "All schedules fetched successfully!",
      data: schedules,
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


// Get Schedule by ID
scheduleController.get("/:id", async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id).populate("enquiryId");
    if (!schedule) {
      return sendResponse(res, 404, "Failed", {
        message: "Schedule not found!",
        statusCode: 404,
      });
    }

    sendResponse(res, 200, "Success", {
      message: "Schedule fetched successfully!",
      data: schedule,
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

// Update Schedule
scheduleController.put("/update/:id", async (req, res) => {
  try {
    const updated = await Schedule.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updated) {
      return sendResponse(res, 404, "Failed", {
        message: "Schedule not found!",
        statusCode: 404,
      });
    }

    sendResponse(res, 200, "Success", {
      message: "Schedule updated successfully!",
      data: updated,
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

// Delete Schedule
scheduleController.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await Schedule.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return sendResponse(res, 404, "Failed", {
        message: "Schedule not found!",
        statusCode: 404,
      });
    }

    sendResponse(res, 200, "Success", {
      message: "Schedule deleted successfully!",
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

module.exports = scheduleController;
