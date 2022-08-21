const {
  conversation,
  getConversation,
} = require("../controllers/conversationController");

const router = require("express").Router();

router.post("/", conversation);
router.get("/:userId", getConversation);

module.exports = router;
