const mongoose = require("mongoose");
const Teacher = require("../models/teacher.js");
const Student = require("../models/student.js");
class TeacherController {
  async createTeacher(req, res) {
    try {
      const { email, name } = await req.body;
      Teacher.findOne({ email: email }).then((teacher) => {
        if (teacher) {
          res.status(400).json({ message: "email id already exists" });
          return;
        }
        const newTeacher = new Teacher({
          name,
          email,
        });
        newTeacher.save();
        res.json({
          message: "teacher created successfully",
          ...newTeacher._doc,
        });
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  async assignStudent(req, res) {
    try {
      const { email, uid } = await req.body;
      const teacher = await Teacher.findOne({ email: email }).populate(
        "students"
      );
      if (teacher.students.length == 4) {
        res
          .status(400)
          .json({ message: "cannot assign more than 4 students." });
        return;
      }
      Student.findOne({ uid: uid }).then((student) => {
        if (student.assigned == true) {
          res.status(400).json({ message: "student already assigned" });
          return;
        }
        student.assigned = true;
        student.save();
        teacher.students.push(student._id);
        teacher.save();
        res.json({
          message: "student assigned successfully",
          ...teacher._doc,
        });
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  async removeStudent(req, res) {
    try {
      const { email, uid } = await req.body;
      const student = await Student.findOne({ uid: uid });
      student.assigned = false;
      student.save();
      Teacher.updateOne(
        { email: email },
        { $pull: { students: student._id } }
      ).then(async (teacher) => {
        const updatedTeacher = await Teacher.findOne({ email: email });
        res.json({
          message: "student removed successfully",
          ...updatedTeacher._doc,
        });
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  async evaluateStudent(req, res) {
    try {
      const { uid, ideation, execution, viva, theory } = await req.body;
      const student = await Student.findOne({ uid: uid });
      // if (student.evaluated == true) {
      //   res.status(400).json({ message: "student already evaluated" });
      //   return;
      // }
      Student.updateOne(
        { uid: uid },
        {
          ideation: ideation,
          execution: execution,
          viva: viva,
          theory: theory,
          evaluated: true,
        }
      ).then((updated) => {
        res.json({ message: "student evaluated successfully" });
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  async evaluatedStudents(req, res) {
    const { email } = await req.body;
    Teacher.findOne({ email: email })
      .populate("students")
      .then((teacher) => {
        let evaluated = [];
        for (let i = 0; i < teacher.students.length; i++) {
          if (teacher.students[i].evaluated == true) {
            evaluated.push(teacher.students[i]);
          }
        }
        res.json(evaluated);
      });
  }
  async unEvaluatedStudents(req, res) {
    const { email } = await req.body;
    Teacher.findOne({ email: email })
      .populate("students")
      .then((teacher) => {
        let evaluated = [];
        for (let i = 0; i < teacher.students.length; i++) {
          if (teacher.students[i].evaluated == false) {
            evaluated.push(teacher.students[i]);
          }
        }
        res.json(evaluated);
      });
  }
  async assignedStudents(req, res) {
    const { email } = await req.body;
    Teacher.findOne({ email: email })
      .populate("students")
      .then((teacher) => {
        res.json(teacher.students);
      });
  }
}

module.exports = new TeacherController();
