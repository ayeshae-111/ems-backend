const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const User = require("../models/User"); // Use User model for consistency

// GET /api/employees/me
router.get("/me", protect, async (req, res) => {
  try {
    const employee = await User.findById(req.user._id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (err) {
    console.error("Get employee error:", err);
    res.status(500).json({ message: err.message });
  }
});

// GET /api/employees (admin only)
router.get("/", protect, admin, async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" }).select("-password");
    res.json(employees);
  } catch (err) {
    console.error("Get employees error:", err);
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/employees/:id (admin only)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const employee = await User.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    if (employee.role !== "employee") return res.status(403).json({ message: "Cannot delete non-employee" });

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("Delete employee error:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
