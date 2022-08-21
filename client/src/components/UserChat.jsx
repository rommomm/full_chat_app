import React, { useEffect, useRef } from "react";
import { useState } from "react";
import api from "../utils/api";

import "../pages/styles.scss";
import Message from "./Message";

import { v4 as uuidv4 } from "uuid";
import ChatInput from "./ChatInput";

const UserChat = ({ currentChat, socket, user }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef(null);
  const date = new Date().toISOString();

  console.log(messages);

  const getAllMessages = async () => {
    try {
      if (currentChat) {
        const response = await api.post("/messages/get-message", {
          from: user._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  useEffect(() => {
    getAllMessages();
  }, [currentChat]);

  const handleSendMessage = async (message) => {
    socket.current.emit("send-msg", {
      from: user._id,
      to: currentChat._id,
      message,
    });
    await api.post("/messages/add-message", {
      from: user._id,
      to: currentChat._id,
      message: message,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: message, date: date });
    setMessages(msgs);
  };

  useEffect(() => {
    socket?.current?.on("msg-recieve", (msg) => {
      setArrivalMessage({ fromSelf: false, message: msg });
    });
  }, [messages]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="user-chat-container">
      <div className="user-chat-title">
        <div className="user-img">
          <img
            className="user-contact-img"
            src={currentChat.avatar}
            width={50}
            height={50}
          />
        </div>
        <span>{currentChat.username}</span>
      </div>
      <div className="user-chat-main">
        <div className="user-chat">
          {messages &&
            messages.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <Message message={message} />
                </div>
              );
            })}
        </div>
        <ChatInput handleSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default UserChat;
