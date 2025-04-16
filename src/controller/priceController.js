const express = require("express");
const { sendResponse } = require("../utils/common");
const Pricing = require("../model/price.Schema");
const upload = require("../utils/multer");
const cloudinary = require("../utils/cloudinary");

const pricingController = express.Router();

// Create Pricing
pricingController.post("/create", upload.single("image"), async (req, res) => {
  try {
    let obj = { ...req.body };

    if (req.file) {
      const image = await cloudinary.uploader.upload(req.file.path);
      obj.image = image.url;
    }

    const pricing = await Pricing.create(obj);

    sendResponse(res, 200, "Success", {
      message: "Pricing created successfully!",
      data: pricing,
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

// Get All Pricings
pricingController.get("/all", async (req, res) => {
  try {
    const { searchKey = "", sortByField = "createdAt", sortOrder = "-1" } = req.query;

    const query = {};
    if (searchKey) {
      query.$or = [
        { title: { $regex: searchKey, $options: "i" } },
        { subtitle: { $regex: searchKey, $options: "i" } },
        { service: { $regex: searchKey, $options: "i" } },
      ];
    }

    const sort = {};
    sort[sortByField] = parseInt(sortOrder);

    const pricings = await Pricing.find(query).sort(sort);
    sendResponse(res, 200, "Success", {
      message: "All pricing plans fetched successfully!",
      data: pricings,
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

// Get Pricing by ID
pricingController.get("/:id", async (req, res) => {
  try {
    const pricing = await Pricing.findById(req.params.id);
    if (!pricing) {
      return sendResponse(res, 404, "Failed", {
        message: "Pricing plan not found!",
        statusCode: 404,
      });
    }

    sendResponse(res, 200, "Success", {
      message: "Pricing plan fetched successfully!",
      data: pricing,
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

// Update Pricing
pricingController.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const id = req.params.id;
    const pricing = await Pricing.findById(id);

    if (!pricing) {
      return sendResponse(res, 404, "Failed", {
        message: "Pricing plan not found!",
        statusCode: 404,
      });
    }

    let updatedData = { ...req.body };

    if (req.file) {
      // Delete old image from Cloudinary
      if (pricing.image) {
        const publicId = pricing.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId, (error, result) => {
          if (error) {
            console.error("Error deleting old image from Cloudinary:", error);
          } else {
            console.log("Old image deleted from Cloudinary:", result);
          }
        });
      }

      // Upload new image
      const image = await cloudinary.uploader.upload(req.file.path);
      updatedData.image = image.url;
    }

    const updatedPricing = await Pricing.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    sendResponse(res, 200, "Success", {
      message: "Pricing plan updated successfully!",
      data: updatedPricing,
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

// Delete Pricing
pricingController.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pricing = await Pricing.findById(id);

    if (!pricing) {
      return sendResponse(res, 404, "Failed", {
        message: "Pricing plan not found!",
        statusCode: 404,
      });
    }

    // Delete image from Cloudinary if exists
    if (pricing.image) {
      const publicId = pricing.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          console.error("Error deleting image from Cloudinary:", error);
        } else {
          console.log("Cloudinary image deletion result:", result);
        }
      });
    }

    await Pricing.findByIdAndDelete(id);

    sendResponse(res, 200, "Success", {
      message: "Pricing plan and associated image deleted successfully!",
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

module.exports = pricingController;
