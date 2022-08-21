const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config();
const userRoute = require("./routes/userRoutes");
const conversationRoute = require("./routes/conversationRoutes");
const messageRoute = require("./routes/messageRoute");
const User = require("./model/userModel");
const Message = require("./model/messageModel");
const socket = require("socket.io");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/auth", userRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

const server = require("http").createServer(app);

// const io = require("socket.io")(server, {
//   cors: {
//     origin: "http://localhost:5000",
//     method: ["GET", "POST"],
//   },
// });

// const getLastMessagesFromRoom = async (room) => {
//   let roomMessages = await Message.aggregate([
//     { $match: { to: room } },
//     { $group: { _id: "$date", messagesByDate: { $push: "$$ROOT" } } },
//   ]);
//   return roomMessages;
// };

// const sortRoomMessagesByDate = (messages) => {
//   return messages.sort((a, b) => {
//     let date1 = a._id.split("/");
//     let date2 = b._id.split("/");

//     date1 = date1[2] + date1[0] + date1[1];
//     date2 = date2[2] + date2[0] + date2[1];

//     return date1 < date2 ? -1 : 1;
//   });
// };

// io.on("connection", (socket) => {
//   socket.on("new-user", async () => {
//     const members = await User.find();
//     console.log(members);
//     io.emit("new-user", members);
//   });

//   socket.on("join-room", async (newRoom, previousRoom) => {
//     socket.join(newRoom);
//     socket.leave(previousRoom);
//     let roomMessages = await getLastMessagesFromRoom(newRoom);
//     roomMessages = sortRoomMessagesByDate(roomMessages);
//     socket.emit("room-messages", roomMessages);
//   });

//   socket.on("message-room", async (room, content, sender, time, date) => {
//     const newMessage = await Message.create({
//       content,
//       from: sender,
//       time,
//       date,
//       to: room,
//     });
//     let roomMessages = await getLastMessagesFromRoom(room);
//     roomMessages = sortRoomMessagesByDate(roomMessages);
//     // sending message to room
//     io.to(room).emit("room-messages", roomMessages);
//     socket.broadcast.emit("notifications", room);
//   });

//   app.delete("/logout", async (req, res) => {
//     try {
//       const { _id, newMessages } = req.body;
//       const user = await User.findById(_id);
//       user.status = "offline";
//       user.newMessages = newMessages;
//       await user.save();
//       const members = await User.find();
//       socket.broadcast.emit("new-user", members);
//       res.status(200).send();
//     } catch (e) {
//       console.log(e);
//       res.status(400).send();
//     }
//   });
// });

app.get("/rooms", (req, res) => {
  res.json(rooms);
});

server.listen(process.env.PORT, () => {
  console.log("listening to port", process.env.PORT);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:5000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    console.log("data", data);
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});

// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");

// const app = express();
// require("dotenv").config();

// const userRoute = require("./routes/userRoutes");
// const conversationRoute = require("./routes/conversationRoute");
// const messageRoute = require("./routes/userRoutes");

// app.use(cors());
// app.use(express.json({ extends: true }));

// app.use("/api/auth", require("./routes/userRoutes"));
// // app.use("/api/conversations", conversationRoute);
// // app.use("/api/messages", messageRoute);

// const server = async () => {
//   try {
//     mongoose.connect(process.env.MONGO_URL).then(() => {
//       console.log(`database connection`);
//     });
//     app.listen(process.env.PORT, () => {
//       console.log(`server started ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// server();
