const userService = require("../services/authService");

// রেজিস্ট্রেশন (নতুন ইউজার তৈরি করা)
const registerUser = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    const token = userService.generateToken(user._id);
    res.header("Authorization", token).status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// লগিন (ইউজার লগিন করা)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);
    const token = userService.generateToken(user._id);
    res.header("Authorization", token).send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// প্রোটেক্টেড রাউট (শুধুমাত্র অথেন্টিকেটেড ইউজারের জন্য)
const getProtectedData = (req, res) => {
  res.send("This is protected data for authenticated users only.");
};

module.exports = {
  registerUser,
  loginUser,
  getProtectedData,
};
