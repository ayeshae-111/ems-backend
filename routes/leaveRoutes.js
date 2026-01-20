const express = require("express");
const Leave = require("../models/Leave");

const router = express.Router();

// Apply for leave
router.post("/", async (req, res) => {
  try {
    const leave = new Leave(req.body);
    await leave.save();
    res.status(201).json({
      message: "Leave applied successfully", // <-- add this
      leave
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get all leaves
router.get("/", async (req, res) => {
  try {
    const leaves = await Leave.find().populate("employeeId");
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get leaves by employee ID
router.get("/:employeeId", async (req, res) => {
  try {
    const leaves = await Leave.find({ employeeId: req.params.employeeId });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ADMIN: Approve or Reject leave
router.put("/update/:id", async (req, res) => {
  try {
    const { status } = req.body; // expected: "Approved" or "Rejected"
    
    // Find the leave by ID and update the status
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } // return the updated document
    );

    if (!leave) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    res.json({
      message: "Leave status updated",
      leave
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


module.exports = router;