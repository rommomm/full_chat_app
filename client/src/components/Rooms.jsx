import React, { useContext, useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import api from "../utils/api";
import Room from "./Room";

import "../pages/styles.scss";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Rooms = ({ setRoomsChat }) => {
  const [rooms, setRooms] = useState([]);
  const [searchRoom, setSearchRoom] = useState("");
  const [roomName, setRoomName] = useState("");

  const handleGetRooms = async () => {
    try {
      const { data } = await api.get("/auth/users");
      setRooms(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const onSearchChange = (e) => {
    setSearchRoom(e.target.value);
  };

  const filteredRooms = rooms.filter((rooms) => {
    return rooms.username.toLowerCase().includes(searchRoom.toLowerCase());
  });

  const roomsMap = filteredRooms ? filteredRooms : rooms || [];

  useEffect(() => {
    handleGetRooms();
  }, []);

  const handleCreateRoom = () => {
    setRooms((rooms) => [
      { _id: "wgwg2g2523rwer", username: roomName, avatar: roomName },
      ...rooms,
    ]);
    setRoomName("");
    // try {
    //   const { data } = await api.post("/create/room", { roomName });
    //   console.log("data :>> ", data);
    // } catch (error) {
    //   console.log("error", error);
    // }
  };

  return (
    <div className="contact-container">
      <div className="search">
        <div className="search-icon" onClick={() => setRoomsChat(false)}>
          <ChatOutlinedIcon sx={{ width: 30, height: 30 }} />
        </div>
        <TextField
          label="Search room..."
          onChange={onSearchChange}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </div>
      <div className="rooms">
        <div className="contact">
          <TransitionGroup className="history-transaction">
            {rooms &&
              rooms.length &&
              roomsMap.map((room) => {
                return (
                  <CSSTransition
                    key={room._id}
                    timeout={500}
                    classNames="history-transaction-item"
                  >
                    <div key={room._id}>
                      <Room room={room} />
                    </div>
                  </CSSTransition>
                );
              })}
          </TransitionGroup>
        </div>
        <div className="create-room">
          <TextField
            label="Room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <Button
            variant="contained"
            size="small"
            onClick={handleCreateRoom}
            disabled={!roomName || roomName.length < 3}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
