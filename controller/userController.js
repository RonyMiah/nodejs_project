const bcrypt = require("bcrypt");
const { unlink } = require("fs");
const path = require("path");

const User = require("../models/people");

async function getUser(req, res, next) {
  try {
    const users = await User.find();
    res.render("users", {
      users: users,
    });
  } catch (err) {
    next(err);
  }
}

async function addUser(req, res, next) {
  let newUser;
  const hasedPassword = await bcrypt.hash(req.body.password, 10);

  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hasedPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hasedPassword,
    });
  }

  //saved user in database
  try {
    const result = await newUser.save();
    res.status(200).json({
      message: "user was added successfully ",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unnon Error occaud ",
        },
      },
    });
  }
}
// remove user
async function removeUser(req, res, next) {
  try {
    const user = await User.findByIdAndDelete({
      _id: req.params.id,
    });

    // remove user avatar if any
    if (user.avatar) {
      unlink(
        path.join(__dirname, `/../public/uplods/avatars/${user.avatar}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }

    res.status(200).json({
      message: "User was removed successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not delete the user!",
        },
      },
    });
  }
}

module.exports = {
  getUser,
  addUser,
  removeUser,
};
