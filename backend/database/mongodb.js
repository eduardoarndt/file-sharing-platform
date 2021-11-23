const mongoose = require("mongoose");

const user = "root";
const password = "root";
const host = "localhost";
const port = "27017";
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
