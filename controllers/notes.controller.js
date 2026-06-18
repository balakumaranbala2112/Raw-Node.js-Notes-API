const sendJson = require("../utils/sendJson");
const createHttpError = require("../utils/createHttpError");
const { getNotes, saveNotes } = require("../utils/notesDb");

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

async function createNote(req, res) {
  const { title, content } = req.body;

  const errors = [];

  if (!title || typeof title !== "string" || title.trim() === "") {
    errors.push("Title is required and must be a non-empty string");
  }

  if (!content || typeof content !== "string" || content.trim() === "") {
    errors.push("Content is required and must be a non-empty string");
  }

  if (errors.length > 0) {
    throw createHttpError(400, "Validation failed", errors);
  }

  const now = new Date().toString();

  const newNote = {
    id: Date.now().toString(),
    title: title.trim(),
    content: content.trim(),
    createdAt: now,
    updatedAt: now,
  };

  const notes = await getNotes();

  notes.push(newNote);

  await saveNotes(notes);

  return sendJson(res, 201, {
    success: true,
    message: "Note created successfully",
    data: newNote,
  });
}

module.exports = {
  getAllNotes,
  getNoteByID,
  createNote,
};
