const mongoose = require("mongoose");

const { Schema } = mongoose;

const FileSchema = new Schema({
    title: String,
    data: String,
    mimetype: String,
    extension: String,
});

async function createFile(folderName, data) {
    collection = folderName + "_files";
    FileModel = mongoose.model(collection, FileSchema);

    const file = new FileModel(data);
    return await file.save();
}

async function getFileFromFolder(folderName, fileTitle) {
    collection = folderName + "_files";
    FileModel = mongoose.model(collection, FileSchema);

    const file = await FileModel.find({ title: fileTitle });
    return file;
}

module.exports = { createFile, getFileFromFolder };
