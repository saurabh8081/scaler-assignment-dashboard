const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const mongoUrl = process.env.mongoUrl;
const studentRouter = require("./routes/student");
const teacherRouter = require("./routes/teacher");
//routers
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/student",studentRouter);
app.use("/teacher",teacherRouter);

mongoose.connect(mongoUrl);

mongoose.connection.on("connected", () => {
  console.log("successfully connected to mongo");
});

mongoose.connection.on("error", () => {
  console.log("not connected to mongodb");
});

app.listen(port, () => {
  console.log("server is running on port" + " " + port);
});
