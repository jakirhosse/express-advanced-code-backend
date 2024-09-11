const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateUser } = require("../validations/userValidation");

// ইউজার রেজিস্ট্রেশন সার্ভিস
const registerUser = async (userData) => {
  const { error } = validateUser(userData);
  if (error) throw new Error(error.details[0].message);

  // ইমেইল চেক করা যদি আগে থেকে রেজিস্টার থাকে
  let user = await User.findOne({ email: userData.email });
  if (user) throw new Error("User already registered");

  // পাসওয়ার্ড এনক্রিপ্ট করা
  const salt = await bcrypt.genSalt(10);
  userData.password = await bcrypt.hash(userData.password, salt);

  // নতুন ইউজার তৈরি
  user = new User(userData);
  return await user.save();
};

// ইউজার লগিন সার্ভিস
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error("Invalid email or password");

  return user;
};

// JWT টোকেন তৈরি
const generateToken = (userId) => {
  return jwt.sign({ _id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = {
  registerUser,
  loginUser,
  generateToken,
};
