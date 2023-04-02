const mongoose = require("mongoose");
const Student = require("../models/student");
const student = async (req, res, next) => {
  try {
    const { uid } = await req.body;
    Student.findOne({ uid: uid }).then((student) => {
      if (!student) {
        res.status(400).json({ message: "Student does not exists" });
      }
    });
    next();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = student;
