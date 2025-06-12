import React, { useState } from "react";
import "../styles.css";
import ReactMarkdown from 'react-markdown';
import { useAppContext } from '../context/AppContext';

const CropEducation = () => {
  const { baseURL} = useAppContext();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      console.log('entring into try block');
      const response = await fetch(`${baseURL}/api/crop-details-chatbot/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      })

      if(response.ok){
        const data = await response.json();
        const aiMessage = { text: data ? data.response :'No Response' , sender: "ai" };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      console.log("API Error: " + error);
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

      <div className="chat-output">
        {messages.map((msg, index) => (
          
          <div
            key={index}
            className={`chat-message ${msg.sender === "user" ? "user" : "ai"}`}
          >
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        ))}
        {loading && (
          <div className="chat-message ai typing">Typing...</div>
        )}
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

export default CropEducation;
