const createError = require("http-errors");

//404 request was not found

function notFoundHandaller(req, res, next) {
  next(createError(404, "Your request connect was not found !"));
}

//default error handalling page
function errorHandaller(err, req, res, next) {
  res.locals.err =
    process.env.NODE_ENV === "development" ? err : { message: err.message };

  res.status(err.status || 500);

  if (res.locals.html) {
    res.render("error", {
      title: "Error page ",
    });
  } else {
    res.json(res.locals.err);
  }
}

module.exports = {
  notFoundHandaller,
  errorHandaller,
};
