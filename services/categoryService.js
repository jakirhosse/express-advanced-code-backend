const User = require("../models/categoryModel");
const { validateUser } = require("../utils/categoryValidate");

// নতুন ইউজার তৈরি

const createUser = async (userData) => {
  const { error } = validateUser(userData);
  if (error) throw new error(error.details[0].message);
  const user = new User(userData);
  return await user.save();
};

// সব ইউজার আনা
const getAllUsers = async () => {
  return await User.find();
};

// নির্দিষ্ট ইউজার আনা
const getUserById = async (id) => {
  return await User.findById(id);
};

// ইউজার আপডেট করা
const updateUser = async (id, userData) => {
  const { error } = validateUser(userData);
  if (error) throw new Error(error.details[0].message);

  return await User.findByIdAndUpdate(id, userData, { new: true });
};

// ইউজার ডিলিট করা
const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
