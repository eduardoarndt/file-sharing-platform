const mongoose = require("mongoose");

const user = process.env["MONGODB_USERNAME"] || "root";
const password = process.env["MONGODB_PASSWORD"] || "root";
const host = process.env["MONGODB_HOST"] || "localhost";
const port = process.env["MONGODB_PORT"] || "27017";
const database = "file-sharing";

const url = `mongodb://${user}:${password}@${host}:${port}/${database}?authSource=admin`;

const db = mongoose
  .connect(url)
  .then(() => {
    console.log(`MongoDB connected.`);
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = db;
