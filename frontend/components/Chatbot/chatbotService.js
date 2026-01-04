import axios from "axios";

export const sendMessage = async (message) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/api/chatbot/chat",
      { message }
    );
    return res.data.reply;
  } catch (err) {
    return "Chatbot hiện đang gặp sự cố. Vui lòng thử lại sau.";
  }
};
