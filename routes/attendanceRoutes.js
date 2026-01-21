const express = require("express");
const Attendance = require("../models/Attendance");

const router = express.Router();

// MARK attendance
router.post("/mark", async (req, res) => {
  try {
    const { employeeId, status } = req.body;
    const attendance = new Attendance({ employeeId, status });
    await attendance.save();
    res.status(201).json({ message: "Attendance marked", attendance });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET all attendance for an employee
router.get("/:employeeId", async (req, res) => {
  try {
    const records = await Attendance.find({ employeeId: req.params.employeeId });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;