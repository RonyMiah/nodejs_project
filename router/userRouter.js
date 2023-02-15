//external file input

const express = require("express");
const router = express.Router();

//internal file input
const { getUser, addUser } = require("../controller/userController");
const decoratorHtmlResponse = require("../middlewares/common/decoratorHtmlResponse");
const avatarUpload = require("../middlewares/user/avatarUpload");
const {
  addUserValidation,
  addUserValidationHandaller,
} = require("../middlewares/user/userValidation");
router.get("/", decoratorHtmlResponse("User"), getUser);

router.post(
  "/",
  avatarUpload,
  addUserValidation,
  addUserValidationHandaller,
  addUser
);

module.exports = router;
