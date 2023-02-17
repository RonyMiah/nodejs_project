const { check, validationResult } = require("express-validator");

const loginValidation = [
  check("username")
    .isLength({ min: 1 })
    .withMessage("User name Must be Required !"),
  check("password")
    .isLength({ min: 1 })
    .withMessage("Password Must Be Required !"),
];

const loginValidationHandaller = function (req, res, next) {
  const errors = validationResult(req);
  const mapedError = errors.mapped();

  if (Object.keys(mapedError).length === 0) {
    next();
  } else {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: mapedError,
    });
  }
};

module.exports = {
  loginValidation,
  loginValidationHandaller,
};
