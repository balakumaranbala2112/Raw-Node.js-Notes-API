const fs = require("node:fs/promises");
const path = require("node:path");

async function writeData(filePath, data) {
  const folderPath = path.dirname(filePath);

  await fs.mkdir(folderPath, { recursive: true });

  const jsonData = JSON.stringify(data, null, 2);

  await fs.writeFile(filePath, jsonData, "utf-8");
}

module.exports = writeData;
