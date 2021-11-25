const express = require("express");
const multer = require("multer");

const app = express();
const port = process.env.PORT || 8080;

const mongo = require("./database/mongodb.js");
const fileSchema = require("./schemas/file");

const upload = multer({ storage: multer.memoryStorage() });

app.post("/file", upload.single("uploaded_file"), async (req, res) => {
  const fileTitle = req.body.title;
  const filePassword = req.body.password;
  const rawFile = req.file.buffer.toString("base64");
  const fileMimetype = req.file.mimetype;
  const fileExtension = req.file.mimetype.match("([^/]+$)")[1];

  const file = {
    title: fileTitle,
    password: filePassword,
    data: rawFile,
    mimetype: fileMimetype,
    extension: fileExtension,
  };

  try {
    const fileCreated = await fileSchema.createFile(file);
    res.send(fileCreated);
  } catch (error) {
    res.status(500).send(`${error}`);
  }
});

app.get("/file/", async (req, res) => {
  const files = await fileSchema.getAllFiles();
  res.status(200).json(files);
});

app.get("/file/:_id", async (req, res) => {
  const fileId = req.params._id;
  const password = req.query.password ?? req.params.password;

  try {
    const file = await fileSchema.getFile(fileId, password);

    res.writeHead(200, {
      "Content-Disposition": `attachment; filename="${file.title}.${file.extension}"`,
      "Content-Type": file.mimetype,
    });

    const download = Buffer.from(file.data, "base64");
    res.end(download);
  } catch (error) {
    res.status(401).send({ errorMessage: error.message });
  }
});

app.server = app.listen(port, () => {
  console.log(`Running on port ${port}.`);
});

module.exports = app;
