import React, { useState } from "react";
import Contact from "./Contact";
import api from "../utils/api";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";
import { Box, TextField } from "@mui/material";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";

import "../pages/styles.scss";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Contacts = ({ setRoomsChat, changeChat }) => {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const handleGetUsers = async (values) => {
    try {
      const { data } = await api.get("/auth/users");
      setUsers(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const onSearchChange = (e) => {
    setSearchUser(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    return user.username.toLowerCase().includes(searchUser.toLowerCase());
  });

  const usersMap = filteredUsers ? filteredUsers : users || [];

  useEffect(() => {
    handleGetUsers();
  }, []);

  const { _id } = JSON.parse(localStorage.getItem("chat-app-user"));
  // onClick={() => setRoomsChat(true)}
  return (
    <div className="contact-container">
      <div className="search">
        <div className="search-icon">
          <MeetingRoomOutlinedIcon sx={{ width: 30, height: 30 }} />
        </div>
        <TextField
          onChange={onSearchChange}
          label="Search user..."
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </div>
      <div className="contact-users">
        <TransitionGroup className="history-transaction">
          {users &&
            users.length &&
            usersMap.map((user, index) => {
              if (user._id !== _id) {
                return (
                  <CSSTransition
                    key={user._id}
                    timeout={500}
                    classNames="history-transaction-item"
                  >
                    <div
                      className={`${
                        user._id === currentSelected ? "selected" : ""
                      }`}
                      key={user._id}
                      onClick={() => changeCurrentChat(user._id, user)}
                    >
                      <Contact user={user} />
                    </div>
                  </CSSTransition>
                );
              }
            })}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default Contacts;
