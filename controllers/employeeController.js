const Employee = require("../models/employee");

exports.getMyProfile = async (req, res) => {
  try {
    const employee = await Employee.findOne({ user: req.user._id });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    console.error("getMyProfile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};