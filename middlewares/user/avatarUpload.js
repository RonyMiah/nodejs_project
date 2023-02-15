const Uploads = require("../../utilities/signUp");

const avatarUpload = function (req, res, next) {
  const upload = Uploads(
    "avatars",
    ["image/jpg", "image/jpeg", "image/png"],
    1000000,
    " Only jpg or jpeg  or png format allow "
  );

  //call the middleware function

  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
};

module.exports = avatarUpload;



