import React, { useState, useRef, useEffect } from "react";
import "../styles.css";
import ReactMarkdown from "react-markdown";
import { useAppContext } from '../context/AppContext';

const Ai = () => {
  const { baseURL} = useAppContext();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatOutputRef = useRef(null); // ✅ Ref for chat output

  // ✅ Auto-scroll when messages update
  useEffect(() => {
    if (chatOutputRef.current) {
      chatOutputRef.current.scrollTop = chatOutputRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);


    try {
      console.log("befor fatch");
      const response = await fetch(`"${baseURL}/api/chat/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }), // sending user's message
      });
      if (response.ok) {
        const data = await response.json();
        const aiMessage = {
          text: data ? data.response : "No Response",
          sender: "ai",
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        throw new Error("API responded with status: " + response.status);
      }
    } catch (error) {
      console.log(JSON.stringify({ message: input }));
      console.error("Fetch failed:", error);

      setMessages((prev) => [
        ...prev,
        { text: "Error: Unable to connect to AI.", sender: "ai" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-output" ref={chatOutputRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === "user" ? "user" : "ai"}`}
          >
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        ))}
        {loading && <div className="chat-message ai typing">Typing...</div>}
      </div>
      <div className="chat-input-container">
        <textarea
          className="chat-input"
          placeholder="Send a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          autoFocus='true'
        />
        <button className="chat-send" onClick={handleSend}>
          ➤
        </button>
      </div>
    </div>
  );
};

export default Ai;
