const http = require("node:http");

const sendJson = require("./utils/sendJson");
const runMiddlewares = require("./utils/runMiddlewares");
const createHttpError = require("./utils/createHttpError");

const logger = require("./middleware/logger");
const security = require("./middleware/security");
const urlParser = require("./middleware/urlParser");
const jsonBody = require("./middleware/jsonBody");
const errorHandler = require("./middleware/errorHandler");

const notesRoutes = require("./routes/notes.routes");

const PORT = 3000;

async function routeHandler(req, res) {
  const method = req.method;
  const pathname = req.pathname;

  if (method === "GET" && pathname === "/") {
    return sendJson(res, 200, {
      success: true,
      message: "Raw Node Notes API is running",
    });
  }

  if (method === "GET" && pathname === "/health") {
    return sendJson(res, 200, {
      success: true,
      status: "OK",
    });
  }

  const isNotesRouteHandled = await notesRoutes(req, res);

  if (isNotesRouteHandled) {
    return;
  }

  if (method === "GET" && pathname === "/crash") {
    throw new Error("Testing global error handler");
  }

  throw createHttpError(404, "Route not found");
}

const middlewares = [logger, security, urlParser, jsonBody];

const server = http.createServer((req, res) => {
  runMiddlewares(req, res, middlewares, routeHandler, errorHandler);
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
