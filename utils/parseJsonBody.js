const createHttpError = require("./createHttpError");

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    let bodySize = 0;

    const MAX_BODY_SIZE = 100_000;

    req.on("data", (chunk) => {
      bodySize += chunk.length;

      if (bodySize > MAX_BODY_SIZE) {
        reject(createHttpError(413, "Payload too large"));
        req.destroy();
        return;
      }

      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const parsedBody = body ? JSON.parse(body) : {};
        resolve(parsedBody);
      } catch (err) {
        reject(createHttpError(400, "Invalid JSON"));
      }
    });

    req.on("error", (err) => {
      reject(err);
    });
  });
}

module.exports = parseJsonBody;
