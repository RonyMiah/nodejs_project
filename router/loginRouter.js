//external file input

const express = require("express");

//internal file input
const { loginController } = require("../controller/loginController");
const decoratorHtmlResponse = require("../middlewares/common/decoratorHtmlResponse");
const router = express.Router();

router.get("/", decoratorHtmlResponse("Login"), loginController);

module.exports = router;
