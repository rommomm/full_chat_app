import React from "react";

import "../pages/styles.scss";

const Contact = ({ user }) => {
  if (!user) {
    return null;
  }
  return (
    <div className="user-contact">
      <div className="user-img">
        <img
          className="user-contact-img"
          src={user.avatar}
          width={50}
          height={50}
        />
        {/* {user.status === "online" ? (
          <div className="user-online-icon" />
        ) : (
          <div className="user-offline-icon" />
        )} */}
      </div>
      <span>{user.username}</span>
    </div>
  );
};

export default Contact;
