const mongoose = require("mongoose");
const Student = require("../models/student.js");
class StudentController {
  async createStudent(req, res) {
    try {
      const { name, uid, ideation, execution, viva, theory, email, assigned } =
        await req.body;
      if (!name || !uid || !email) {
        return res.status(422).json({ error: "Please add all the fields" });
      }
      Student.findOne({ $or: [{ email: email }, { uid: uid }] }).then(
        (savedUser) => {
          if (savedUser) {
            return res
              .status(400)
              .json({ message: "User already exist with that email or uid" });
          }
          const student = new Student({
            name,
            uid,
            ideation,
            execution,
            viva,
            theory,
            email,
            assigned,
          });
          student
            .save()
            .then((user) => {
              res.json({ message: "Registered successfully", ...student._doc });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      );
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  async unassignedStudents(req, res) {
    try {
      Student.find({ assigned: false }).then((students) => {
        res.json(students);
      });
    } catch (e) {
      res.staus(500).json({ error: e.message });
    }
  }
}

module.exports = new StudentController();
