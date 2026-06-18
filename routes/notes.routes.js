const { getAllNotes, getNoteByID } = require("../controllers/notes.controller");

async function notesRoutes(req, res) {
  const method = req.method;
  const pathname = req.pathname;
  const pathParts = req.pathParts;

  if (method === "GET" && pathname === "/notes") {
    await getAllNotes(req, res);
    return true;
  }

  if (
    method === "GET" &&
    pathParts[1] === "notes" &&
    pathParts[2] &&
    pathParts.length === 3
  ) {
    req.params = {
      id: pathParts[2],
    };

    await getNoteByID(req, res);
    return true;
  }

  return false;
}

module.exports = notesRoutes;
