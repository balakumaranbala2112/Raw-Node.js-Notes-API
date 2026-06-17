const fs = require("node:fs/promises");
const createHttpError = require("./createHttpError");

async function readData(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf-8");

    return data ? JSON.parse(data) : [];
  } catch (err) {
    if (err.code === "ENOENT") {
      return [];
    }

    if (err instanceof SyntaxError) {
      throw createHttpError(500, "Data file contains invalid JSON");
    }

    throw err;
  }
}

module.exports = readData;
