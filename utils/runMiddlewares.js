function runMiddlewares(req, res, middlewares, finalHandler, errorHandler) {
  let index = 0;

  function next(err) {
    if (err) {
      return errorHandler(err, req, res);
    }

    if (index < middlewares.length) {
      const middleware = middlewares[index];
      index++;

      try {
        return Promise.resolve(middleware(req, res, next)).catch(next); // .catch((err) => { next(err); });
      } catch (error) {
        return next(error);
      }
    }

    try {
      return Promise.resolve(finalHandler(req, res)).catch(next);
    } catch (error) {
      return next(error);
    }
  }
  next();
}

module.exports = runMiddlewares;
