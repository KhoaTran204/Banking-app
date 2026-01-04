const { chatWithAI } = require("../services/chatbot.service");

exports.chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const reply = await chatWithAI(message);
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: "Chatbot error" });
  }
};
