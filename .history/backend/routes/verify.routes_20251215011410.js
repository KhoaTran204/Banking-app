const express = require("express");
const router = express.Router();
const tokenService = require("../services/token.service");
const usersSchema = require("../model/users.model");

router.get("/", (req, res) => {
  tokenService.verifyToken(req, res);
});

module.exports = router;
