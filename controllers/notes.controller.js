const sendJson = require("../utils/sendJson");
const createHttpError = require("../utils/createHttpError");
const { getNotes } = require("../utils/notesDb");

async function getAllNotes(req, res) {
  const notes = await getNotes();

  return sendJson(res, 200, {
    success: true,
    message: "Notes fetched successfully",
    count: notes.length,
    data: notes,
  });
}

async function getNoteByID(req, res) {
  const noteId = req.params.id;

  const notes = await getNotes();

  const note = notes.find((note) => note.id === noteId);

  if (!note) {
    throw createHttpError(404, "Note not found");
  }

  return sendJson(res, 200, {
    success: true,
    message: "Note fetched successfully",
    data: note,
  });
}

module.exports = {
  getAllNotes,
  getNoteByID,
};
