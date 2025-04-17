import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Chatbtn = () => {
  return (
    <div className="chat-float-button">
      <Link to="/ai-service" title="Chat with AI">💬</Link>
    </div>
  );
};

export default Chatbtn;
