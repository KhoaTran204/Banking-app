const express = require("express");
const router = express.Router();
const { chatWithBot } = require("../controller/chatbot.controller");

router.post("/", chatWithBot);

module.exports = router;
