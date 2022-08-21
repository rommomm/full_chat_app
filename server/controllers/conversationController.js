const Conversation = require("../model/conversationModel");

module.exports.conversation = async (req, res, next) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    next(err);
  }
};

module.exports.getConversation = async (req, res, next) => {
  console.log("req.params", req.params);
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    next(err);
  }
};
