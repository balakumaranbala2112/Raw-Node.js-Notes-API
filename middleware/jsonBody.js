const parseJsonBody = require("../utils/parseJsonBody");
const createHttpError = require("../utils/createHttpError");

async function jsonBody(req, res, next) {
  const methodsWithBody = ["POST", "PUT", "PATCH"];

  if (!methodsWithBody.includes(req.method)) {
    return next();
  }

  const contentType = req.headers["content-type"] || "";
  console.log("Content-Type:", contentType);

  if (!contentType.includes("application/json")) {
    return next(createHttpError(415, "Content-Type must be application/json"));
  }

  req.body = await parseJsonBody(req);
  console.log("Parsed body:", req.body);

  next();
}

module.exports = jsonBody;
