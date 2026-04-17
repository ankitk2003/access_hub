import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const createUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  console.log("Creating user with data:", { username, email, role }); // Debug log

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      createdBy: req.userId,
      updatedBy: req.userId,
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "your account has been created",
      text: `Welcome to our platform! Your account has been created successfully.
       Here are your login credentials: email: ${email} password: ${password}
       Please keep this information secure and do not share it with anyone.`,
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    let { search, role, page = 1, limit = 10 } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    limit = Math.min(limit, 50);

    let query = {};

    // 🔍 search (name or email)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (role) {
      query.role = role;
    }

    const totalUsers = await User.countDocuments(query);

    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("updatedBy", "username email");

    // ✅ response
    res.status(200).json({
      success: true,
      totalUsers,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .select("email username") // ❌ hide password
      .populate("updatedBy", "username email")
      .populate("createdBy", "username email");

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

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = req.body;
    updateData.updatedBy = req.userId;

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .select("-password")
      .populate("updatedBy", "username email")
      .populate("createdBy", "username email");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ success
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ build update object
    const updateData = {
      status: req.body.status,
      updatedBy: req.userId, // from auth middleware
    };

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .select("username email status")
      .populate("updatedBy", "username email")
      .populate("createdBy", "username email");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User status updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if(user.role === "admin"){
      return res.status(403).json({
        message: "Cannot delete admin user",
      });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Delete failed",
      error: err.message,
    });
  }
};

export default {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  updateUserStatus,
  deleteUser
};
