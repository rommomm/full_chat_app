import React from "react";
import { DateTime } from "luxon";

const Message = ({ message }) => {
  const date = DateTime.fromISO(message.date).toFormat("hh:mm");
  return (
    <div className={message.fromSelf ? "message" : "message  own"}>
      <div className="message-top">
        <img
          className="user-contact-img"
          src="http://res.cloudinary.com/freee32fw/image/upload/v1657298634/sennc7yygat1dp9kcws2.png"
          width={40}
          height={40}
        />
        <div className="message-container-chat">
          <p className="message-text">{message.message}</p>
          <div className="message-bottom">{date}</div>
        </div>
      </div>
    </div>
  );
};

export default Message;
