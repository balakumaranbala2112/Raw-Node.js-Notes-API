const http = require("node:http");
const sendJson = require("./utils/sendJson");

const PORT = 3000;

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);

  const method = req.method;
  const pathname = requestUrl.pathname;

  if (method === "GET" && pathname === "/") {
    return sendJson(res, 200, {
      message: "Raw Node Notes API is running",
    });
  }

  if (method === "GET" && pathname === "/health") {
    return sendJson(res, 200, {
      status: "OK",
    });
  }

  return sendJson(res, 404, {
    message: "Route not found",
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
