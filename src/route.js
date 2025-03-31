const express = require("express");
const router = express.Router();
const userController = require("./controller/userController");
const itrController = require("./controller/itrController");

router.use("/user", userController);
router.use("/itr", itrController);


module.exports = router;