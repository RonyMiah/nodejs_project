const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");

//internal imports

const User = require("../../models/people");

const addUserValidation = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is Required ")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("name must be contain anything other than alphabet")
    .trim(),

  check("email")
    .isEmail()
    .withMessage("invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError("Email already use !");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),

  check("mobile")
    .isMobilePhone("bn-BD", { strictMode: true })
    .withMessage("Mobile Phone Must be bangladeshi Number")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value });
        if (user) {
          throw createError("Mobail already Use !");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),

  check("password")
    .isStrongPassword()
    .withMessage(
      "Password Must be a least 8 charecters long and shold contain at least 1 lower case and 1 Uppercase and 1 number and 1 symble "
    ),
];

//remove unnessary file

const addUserValidationHandaller = function (req, res, next) {
  const errors = validationResult(req);
  const mapedError = errors.mapped();
  if (Object.keys(mapedError).length === 0) {
    next();
  } else {
    //remove upload file
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(`${__dirname}/../public/uplods/avatars/${filename}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }
    //responce the error
    res.status(500).json({
      errors: mapedError,
    });
  }
};

module.exports = {
  addUserValidation,
  addUserValidationHandaller,
};
