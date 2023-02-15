const createError = require("http-errors");

//404 request was not found

function notFoundHandaller(req, res, next) {
  next(createError(404, "Your request connect was not found !"));
}

//default error handalling page
function errorHandaller(error, req, res, next) {
  res.locals.error =
    process.env.NODE_ENV === "development" ? error : { message: error.message };

  res.status(error.status || 500);

  if (res.locals.html) {
    res.render("error", {
      title: "Error page ",
    });
  } else {
    res.json(res.locals.error);
  }
}

module.exports = {
  notFoundHandaller,
  errorHandaller,
};
