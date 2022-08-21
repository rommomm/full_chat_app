import React from "react";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";

import "../pages/styles.scss";

const Room = ({ room }) => {
  if (!room) {
    return null;
  }
  return (
    <div className="user-room">
      <div className="room-img">
        <ForwardToInboxIcon />
      </div>
      <span>{room.username}</span>
    </div>
  );
};

export default Room;
