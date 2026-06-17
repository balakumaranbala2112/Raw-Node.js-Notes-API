const http = require("node:http");
const path = require("node:path");

const sendJson = require("./utils/sendJson");
const readData = require("./utils/readData");
const writeData = require("./utils/writeData");

const PORT = 3000;

const notesFilePath = path.join(__dirname, "data", "notes.json");

const server = http.createServer(async (req, res) => {
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

  if (method === "GET" && pathname === "/test-read") {
    const notes = await readData(notesFilePath);

    return sendJson(res, 200, {
      message: "Notes file read successfully",
      data: notes,
    });
  }

  if (method === "GET" && pathname === "/test-write") {
    const sampleNotes = [
      {
        id: "1",
        title: "Test note",
        content: "This note was written using writeData utility",
      },
    ];

    await writeData(notesFilePath, sampleNotes);

    return sendJson(res, 200, {
      message: "Notes file written successfully",
    });
  }

  return sendJson(res, 404, {
    message: "Route not found",
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
