const readData = require("./readData");
const writeData = require("./writeData");
const notesFilePath = require("./notesFilePath");

async function getNotes() {
  return await readData(notesFilePath);
}

async function saveNotes(notes) {
  return await writeData(notesFilePath, notes);
}

module.exports = {
  getNotes,
  saveNotes,
};
