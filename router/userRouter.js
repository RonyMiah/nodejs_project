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
router.get("/", decoratorHtmlResponse("User"), getUser);

router.post(
  "/",
  avatarUpload,
  addUserValidation,
  addUserValidationHandaller,
  addUser
);

//delete

router.delete("/:id", removeUser);

module.exports = router;
