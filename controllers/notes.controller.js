const sendJson = require("../utils/sendJson");
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

module.exports = {
  getAllNotes,
};
