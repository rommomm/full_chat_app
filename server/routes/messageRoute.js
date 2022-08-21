const { addMessage, getMessage } = require("../controllers/messageController");

const router = require("express").Router();

router.post("/add-message", addMessage);
router.post("/get-message", getMessage);

module.exports = router;
