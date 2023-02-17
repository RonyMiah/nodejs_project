function decoratorHtmlResponse(pageTitle) {
  return function (req, res, next) {
    res.locals.html = true;
    res.locals.title = ` ${pageTitle}  ${process.env.APP_NAME}`;
    res.locals.loggedInUser = {};
    res.locals.data = {};
    res.locals.errors = {};
    next();
  };
}

module.exports = decoratorHtmlResponse;
