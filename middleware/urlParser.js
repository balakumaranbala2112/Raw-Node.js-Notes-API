function urlParser(req, res, next) {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  req.requestUrl = requestUrl;
  req.pathname = requestUrl.pathname;
  req.pathParts = req.pathname.split("/");

  next();
}

module.exports = urlParser;
