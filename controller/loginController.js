const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const User = require("../models/people");

function getLogin(req, res, next) {
  res.render("index");
}

async function login(req, res, next) {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });
    if (user && user._id) {
      const isvalidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isvalidPassword) {
        //prepair the object and jwt token
        const userObj = {
          username: user.name,
          mobile: user.mobile,
          email: user.email,
          role: "user",
        };

        //prepar the jwt token
        const token = jwt.sign(userObj, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        //set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });

        /////////// set locals
        res.locals.loggedInUser = userObj;

        //render
        res.render("inbox");
      } else {
        throw createError("Login Failed Please Try again");
      }
    } else {
      throw createError("Login Failed Please Try again");
    }
  } catch (err) {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

const logout = function (req, res) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("Log Out");
};

module.exports = {
  getLogin,
  login,
  logout,
};
