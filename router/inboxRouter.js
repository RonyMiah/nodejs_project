//external file input

const express = require("express");
const router = express.Router();

//internal file input
const inboxController = require("../controller/inboxController");
const decoratorHtmlResponse = require("../middlewares/common/decoratorHtmlResponse");

router.get("/", decoratorHtmlResponse("Inbox"), inboxController);

module.exports = router;
