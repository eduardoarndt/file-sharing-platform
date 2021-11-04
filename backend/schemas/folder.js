const mongoose = require("mongoose");

const { Schema } = mongoose;

const FolderSchema = new Schema({
    title: String,
    password: String,
});

const FolderModel = mongoose.model("folder", FolderSchema);

async function createFolder(data) {
    const folder = new FolderModel(data);
    await folder.save();
}

async function getAllFolders() {
    const folders = await FolderModel.find();
    return folders;
}

module.exports = { createFolder, getAllFolders };
