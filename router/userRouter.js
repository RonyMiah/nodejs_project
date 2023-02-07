//external file input

const express = require("express");
const router = express.Router();

//internal file input
const userController = require("../controller/userController");
const decoratorHtmlResponse = require("../middlewares/common/decoratorHtmlResponse");

router.get("/", decoratorHtmlResponse("User"), userController);

module.exports = router;
