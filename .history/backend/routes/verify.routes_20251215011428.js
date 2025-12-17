const express = require("express");
const router = express.Router();
const tokenService = require("../services/token.service");

router.get("/", (req, res) => {
  tokenService.verifyToken(req, res);
});

module.exports = router;
