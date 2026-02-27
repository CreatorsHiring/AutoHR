const mongoose = require("mongoose");
const HR = require("../models/HR");
const sampleData = require("./data");

mongoose
  .connect("mongodb://127.0.0.1:27017/AutoHR")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const initDB = async () => {
  try {
    await HR.deleteMany({});
    console.log("Old HR data deleted");

    await HR.insertMany(sampleData);
    console.log("Sample HR data inserted");

    mongoose.connection.close();
  } catch (err) {
    console.log("Error:", err);
  }
};

initDB();