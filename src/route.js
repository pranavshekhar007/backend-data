const express = require("express");
const router = express.Router();
const userController = require("./controller/userController");
const itrController = require("./controller/itrController");
const adminController = require("./controller/adminController");

router.use("/user", userController);
router.use("/itr", itrController);
router.use("/admin", adminController);

module.exports = router;