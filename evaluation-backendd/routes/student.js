const express = require("express");
const studentRouter = express.Router();
const StudentController = require("../controllers/student_controller");
const Student=require("../models/student")

//adding a student
studentRouter.post("/createStudent", StudentController.createStudent);

studentRouter.get("/unassignedStudents", StudentController.unassignedStudents);
studentRouter.get("/allstudents", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = studentRouter;
