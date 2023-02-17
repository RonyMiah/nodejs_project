//external file input

const express = require("express");
const router = express.Router();

//internal file input
const inboxController = require("../controller/inboxController");
const decoratorHtmlResponse = require("../middlewares/common/decoratorHtmlResponse");
const { checkLogin } = require("../middlewares/common/checkLogin");

router.get("/", decoratorHtmlResponse("Inbox"), checkLogin, inboxController);

module.exports = router;
