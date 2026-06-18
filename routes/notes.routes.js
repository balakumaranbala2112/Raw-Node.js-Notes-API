const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/notes.controller");

async function notesRoutes(req, res) {
  const method = req.method;
  const pathname = req.pathname;
  const pathParts = req.pathParts;

  if (method === "GET" && pathname === "/notes") {
    await getAllNotes(req, res);
    return true;
  }

  if (method === "POST" && pathname === "/notes") {
    await createNote(req, res);
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

    await getNoteById(req, res);
    return true;
  }

  if (
    method === "PUT" &&
    pathParts[1] === "notes" &&
    pathParts[2] &&
    pathParts.length === 3
  ) {
    req.params = {
      id: pathParts[2],
    };

    await updateNote(req, res);
    return true;
  }

  if (
    method === "DELETE" &&
    pathParts[1] === "notes" &&
    pathParts[2] &&
    pathParts.length === 3
  ) {
    req.params = {
      id: pathParts[2],
    };

    await deleteNote(req, res);
    return true;
  }

  return false;
}

module.exports = notesRoutes;
