const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const stream = require("stream");

const app = express();
const port = process.env.PORT || 3000;

const mongo = require("./database/mongodb.js");
const folderSchema = require("./schemas/folder");
const fileSchema = require("./schemas/files");

const upload = multer({ storage: multer.memoryStorage() });

app.post("/folders", json(), async (req, res) => {
    const { title, password } = req.body;
    const folder = { title: title, password: password };
    const result = await folderSchema.createFolder(folder);
    res.send();
});

app.get("/folders", json(), async (req, res) => {
    const folders = await folderSchema.getAllFolders();
    res.send();
});

app.post("/:folder/file", upload.single("uploaded_file"), async (req, res) => {
    const folderName = req.params.folder;

    const fileTitle = req.body.title;
    const rawFile = req.file.buffer.toString("base64");
    const fileMimetype = req.file.mimetype;
    const fileExtension = req.file.mimetype.match("([^/]+$)")[1];
    const file = {
        title: fileTitle,
        data: rawFile,
        mimetype: fileMimetype,
        extension: fileExtension,
    };

    try {
        await fileSchema.createFile(folderName, file);
        res.send();
    } catch (error) {
        res.status(500).send(`${error}`);
    }
});

app.get("/:folder/:file", async (req, res) => {
    const folderName = req.params.folder;
    const fileTitle = req.params.file;

    let file = await fileSchema.getFileFromFolder(folderName, fileTitle);
    file = file[0];

    res.writeHead(200, {
        "Content-Disposition": `attachment; filename="${file.title}.${file.extension}"`,
        "Content-Type": file.mimetype,
    });

    const download = Buffer.from(file.data, "base64");
    res.end(download);
});

app.server = app.listen(port, () => {
    console.log(`Running on port ${port}.`);
});

module.exports = app;
