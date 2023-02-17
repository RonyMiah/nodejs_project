//external file input

const express = require("express");
const router = express.Router();

//internal file input
const {
  getUser,
  addUser,
  removeUser,
} = require("../controller/userController");
const decoratorHtmlResponse = require("../middlewares/common/decoratorHtmlResponse");
const avatarUpload = require("../middlewares/user/avatarUpload");
const {
  addUserValidation,
  addUserValidationHandaller,
} = require("../middlewares/user/userValidation");

const { checkLogin } = require("../middlewares/common/checkLogin");




router.get("/", decoratorHtmlResponse("User"), checkLogin, getUser);

router.post(
  "/",
  checkLogin,
  avatarUpload,
  addUserValidation,
  addUserValidationHandaller,
  addUser
);

//delete

router.delete("/:id", removeUser);

module.exports = router;
