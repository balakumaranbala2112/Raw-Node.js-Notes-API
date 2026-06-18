const { getAllNotes } = require("../controllers/notes.controller");

async function notesRoutes(req, res) {
  const method = req.method;
  const pathname = req.pathname;

  if (method === "GET" && pathname === "/notes") {
    await getAllNotes(req, res);
    return true;
  }

  return false;
}

module.exports = notesRoutes;
