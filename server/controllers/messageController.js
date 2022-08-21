const messageModel = require("../model/messageModel");
const Message = require("../model/messageModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) {
      return res.status(200).json({ msg: "added" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await messageModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updateAt: 1 });
    const projectMessages = messages.map((message) => {
      return {
        fromSelf: message.sender.toString() === from,
        message: message.message.text,
        date: message.createdAt,
      };
    });
    res.status(200).json(projectMessages);
  } catch (error) {
    next(error);
  }
};
