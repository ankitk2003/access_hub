import User from "../models/userModel.js";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// const JWT_USER_PASSWORD = process.env.JWT_user_password;
const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "username email status role",
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const updateMyProfile = async (req, res) => {
  try {
    const { username, password } = req.body;

    const updateData = {};

    if (username) {
      updateData.username = username;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const user = await User.findByIdAndUpdate(req.userId, updateData, {
      new: true,
      runValidators: true,
    }).select("username email status role");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
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
  updateMyProfile,
  getMyProfile
};
