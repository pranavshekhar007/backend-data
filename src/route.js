const express = require("express");
const router = express.Router();
const userController = require("./controller/userController");
const itrController = require("./controller/itrController");
const adminController = require("./controller/adminController");
const enquiryController = require("./controller/enquiryController");

router.use("/user", userController);
router.use("/itr", itrController);
router.use("/admin", adminController);
router.use("/enquiry", enquiryController);

module.exports = router;