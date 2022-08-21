import React, { useState } from "react";
import { TextareaAutosize } from "@material-ui/core";
import { Button } from "@mui/material";

import "../pages/styles.scss";

const ChatInput = ({ handleSendMessage }) => {
  const [message, setMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      handleSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="user-chat-box">
      <TextareaAutosize
        maxRows={5}
        minRows={2}
        className="user-chat-input"
        placeholder="Your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <Button variant="contained" onClick={sendMessage}>
        Send
      </Button>
    </div>
  );
};

export default ChatInput;
