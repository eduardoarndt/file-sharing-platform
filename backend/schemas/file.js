const mongoose = require("mongoose");

const { Schema } = mongoose;

const FileSchema = new Schema({
  title: String,
  password: String,
  data: String,
  mimetype: String,
  extension: String,
});

const FileModel = mongoose.model("file", FileSchema);

async function createFile(data) {
  const file = new FileModel(data);
  await file.save();
}

async function getFile(fileId, filePassword) {
  const file = await FileModel.findOne({ _id: fileId });

  if (file.password !== filePassword) {
    throw new Error(
      `Wrong password for file '${file.title}.${file.extension}'!`
    );
  }

  return file;
}

async function getAllFiles() {
  const files = await FileModel.find({}, "title extension");
  return files;
}

module.exports = { createFile, getFile, getAllFiles };
