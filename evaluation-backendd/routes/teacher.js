const express = require("express");
const teacherRouter = express.Router();
const controller = require("../controllers/teacher_controller");
const studentMidWare = require("../middlewares/student");
const teacherMidWare = require("../middlewares/teacher");

teacherRouter.post("/createTeacher", controller.createTeacher);
teacherRouter.post(
  "/assignStudent",
  teacherMidWare,
  studentMidWare,
  controller.assignStudent
);
teacherRouter.post(
  "/removeStudent",
  teacherMidWare,
  studentMidWare,
  controller.removeStudent
);
teacherRouter.post(
  "/evaluateStudent",
  teacherMidWare,
  controller.evaluateStudent
);
teacherRouter.post(
  "/evaluatedStudents",
  controller.evaluatedStudents
);
teacherRouter.post(
  "/unEvaluatedStudents",
  teacherMidWare,
  controller.unEvaluatedStudents
);
teacherRouter.post(
  "/assignedStudents",
  teacherMidWare,
  controller.assignedStudents
);
teacherRouter.post(
  "/getTeacherData",
  teacherMidWare,
  controller.getTeacherData
);
module.exports = teacherRouter;
