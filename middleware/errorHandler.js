const sendJson = require("../utils/sendJson");

function errorHandler(err, req, res) {
  if (res.headersSent) {
    return res.destroy();
  }

  const statusCode = err.statusCode || 500;

  if (statusCode >= 500) {
    console.error(err);
  }

  const message = statusCode >= 500 ? "Internal server error" : err.message;

  return sendJson(res, statusCode, {
    success: false,
    message,
    errors: err.details || null,
  });
}

module.exports = errorHandler;
