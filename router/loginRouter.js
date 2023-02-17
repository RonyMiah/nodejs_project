//external file input

const express = require("express");

//internal file input
const { getLogin, login, logout } = require("../controller/loginController");
const decoratorHtmlResponse = require("../middlewares/common/decoratorHtmlResponse");
const {
  loginValidation,
  loginValidationHandaller,
} = require("../middlewares/login/loginValidation");

const { redirectLogedIn } = require("../middlewares/common/checkLogin");

const router = express.Router();

//page title
const page_title = "Login";

router.get("/", decoratorHtmlResponse(page_title), redirectLogedIn, getLogin);
router.post(
  "/",
  decoratorHtmlResponse(page_title),
  loginValidation,
  loginValidationHandaller,
  login
);

router.delete("/", logout);

module.exports = router;
