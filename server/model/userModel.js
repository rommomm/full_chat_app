const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, min: 3, max: 20 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 6 },
    avatar: { type: String, required: true },
    newMessage: { type: Object, default: {} },
    status: { type: String, default: "online" },
  },
  { minimize: false }
);

module.exports = mongoose.model("Users", userSchema);
