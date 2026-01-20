const express = require("express");
const router = express.Router();

// Import models (filenames must match exactly)
const User = require("../models/User");
const Leave = require("../models/Leave");
const Attendance = require("../models/Attendance");

// Import auth middleware
const { protect, admin } = require("../middleware/authMiddleware");

// GET /api/dashboard/summary
// Returns counts for admin dashboard
router.get("/summary", protect, admin, async (req, res) => {
  try {
    // Total employees
    const totalEmployees = await User.countDocuments({ role: "employee" });

    // Leave counts
    const totalLeaves = await Leave.countDocuments();
    const pendingLeaves = await Leave.countDocuments({ status: "Pending" });
    const approvedLeaves = await Leave.countDocuments({ status: "Approved" });
    const rejectedLeaves = await Leave.countDocuments({ status: "Rejected" });

    // Attendance count
    const totalAttendance = await Attendance.countDocuments();

    // Send JSON response
    res.json({
      totalEmployees,
      totalLeaves,
      pendingLeaves,
      approvedLeaves,
      rejectedLeaves,
      totalAttendance
    });
  } catch (error) {
    console.error("Dashboard summary error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;