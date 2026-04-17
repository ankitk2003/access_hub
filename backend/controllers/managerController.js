// controllers/manager.controller.js

import User from "../models/userModel.js";

const getManagerUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } })
      .select("username email status role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateManagerUser = async (req, res) => {
  try {
    const { id } = req.params;

    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (existingUser.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Cannot update admin user",
      });
    }

    const allowedFields = ["status", "username"];

    const updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    // track who updated
    updateData.updatedBy = req.userId;

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("username email status role");

    res.status(200).json({
      success: true,
      message: "User updated by manager",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  getManagerUsers,
  updateManagerUser,
};
