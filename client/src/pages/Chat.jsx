import React, { useContext, useEffect, useRef, useState } from "react";
import Contacts from "../components/Contacts";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Rooms from "../components/Rooms";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { useMediaQuery } from "react-responsive";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

import "./styles.scss";
import UserChat from "../components/UserChat";
import { Navigate, useNavigate } from "react-router-dom";
import { AppContext } from "../context/appContext";
import { io } from "socket.io-client";

const Chat = () => {
  const {
    setMembers,
    members,
    setCurrentRoom,
    setRooms,
    privateMemberMsg,
    rooms,
    setPrivateMemberMsg,
    currentRoom,
  } = useContext(AppContext);

  const [roomsChat, setRoomsChat] = useState(false);
  const [openMenu, setOpenMenu] = useState(true);
  const [openLeftMenu, setOpenLeftMenu] = useState(false);
  const [currentChat, setCurrentChat] = useState(undefined);

  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const refMenu = useRef(null);
  const navigate = useNavigate();
  const handleLeftMenu = () => {
    setOpenLeftMenu(!openLeftMenu);
  };
  const user = JSON.parse(localStorage.getItem("chat-app-user"));
  const socket = useRef(null);

  useEffect(() => {
    if (user) {
      socket.current = io("http://localhost:5050");
      socket.current.emit("add-user", user._id);
    }
  }, [user]);

  useEffect(() => {
    if (isSmallScreen) {
      setOpenMenu(false);
    } else {
      setOpenMenu(true);
    }
  }, [isSmallScreen]);

  const handleLogout = () => {
    localStorage.removeItem("chat-app-user");

    navigate("/login");
  };

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="chat-container">
      <div className="main-container">
        <CSSTransition
          in={openMenu}
          timeout={200}
          unmountOnExit
          appear
          onEntered={handleLeftMenu}
          onExit={handleLeftMenu}
          classNames="fade-menu"
        >
          <div className="left-menu" ref={refMenu}>
            {isSmallScreen && (
              <div className="left-menu-close left-menu-mobile">
                <CloseOutlinedIcon
                  onClick={() => setOpenMenu(false)}
                  sx={{ width: 27, height: 27 }}
                />
              </div>
            )}
            <SwitchTransition mode="out-in">
              <CSSTransition
                key={roomsChat}
                addEndListener={(node, done) => {
                  node.addEventListener("transitionend", done, false);
                }}
                classNames="fade"
              >
                {roomsChat ? (
                  <Rooms setRoomsChat={setRoomsChat} />
                ) : (
                  <Contacts
                    setRoomsChat={setRoomsChat}
                    changeChat={handleChatChange}
                  />
                )}
              </CSSTransition>
            </SwitchTransition>
          </div>
        </CSSTransition>

        <div className="chat">
          <div className="chat-logout">
            <LogoutIcon
              sx={{ width: 27, height: 27 }}
              onClick={() => handleLogout()}
            />
          </div>
          {isSmallScreen && (
            <div className="left-menu-mobile">
              <KeyboardArrowRightOutlinedIcon
                onClick={() => setOpenMenu(true)}
                sx={{ width: 27, height: 27 }}
              />
            </div>
          )}
          {currentChat === undefined ? (
            <div className="welcome-chat">
              SELECT A USER AND START A CHAT...
            </div>
          ) : (
            <UserChat currentChat={currentChat} socket={socket} user={user} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
