import User from "../models/User.js";

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User retrieved successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get user",
      error: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const bodyData = req.body;
    const userId = req.params._id;

    const updates = {};

    if (bodyData.name) updates.name = bodyData.name;
    if (bodyData.surname) updates.surname = bodyData.surname;
    if (bodyData.address) updates.address = bodyData.address;
    if (bodyData.phone) updates.phone = bodyData.phone;

    if (req.file) {
      updates.profile_pic = req.fileUrl;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true },
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update user",
      error: error.message,
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const userId = req.params._id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current and new password are required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({
        message: "Current password is incorrect",
      });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update password",
      error: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params._id,
      { $set: { status: false } },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User deactivated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to deactivate user",
      error: error.message,
    });
  }
};
