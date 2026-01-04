import { useState } from "react";
import "./Chatbot.css";
import { sendMessage } from "./chatbotService";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const handleSend = async () => {
    if (!input) return;

    setMessages([...messages, { from: "user", text: input }]);
    const reply = await sendMessage(input);

    setMessages(prev => [...prev, { from: "bot", text: reply }]);
    setInput("");
  };

  return (
    <>
      <button className="chatbot-btn" onClick={() => setOpen(!open)}>💬</button>

      {open && (
        <div className="chatbot-box">
          <div className="chatbot-header">Hỗ trợ 24/7</div>
          <div className="chatbot-body">
            {messages.map((m, i) => (
              <div key={i} className={m.from}>{m.text}</div>
            ))}
          </div>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            placeholder="Nhập câu hỏi..."
          />
        </div>
      )}
    </>
  );
}
