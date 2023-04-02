const mongoose = require("mongoose");
const Teacher = require("../models/teacher");
const teacher = async (req, res, next) => {
  try {
    const { email } = await req.body;
    Teacher.findOne({ email: email }).then((teacher) => {
      if (!teacher) {
        res.status(400).json({ message: "teacher does not exists" });
      }
    });
    next();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = teacher;
