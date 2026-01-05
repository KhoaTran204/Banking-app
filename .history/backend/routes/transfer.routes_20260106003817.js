const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");

router.post("/", (req, res) => {
  controller.transferMoney(req, res);
});

module.exports = router;
