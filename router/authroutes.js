const express = require("express");
const {
  registerUser,
  loginUser,
  getProtectedData,
} = require("../controllers/userController");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// POST - রেজিস্ট্রেশন
router.post("/register", registerUser);

// POST - লগিন
router.post("/login", loginUser);

// GET - প্রোটেক্টেড ডাটা (JWT টোকেন থাকতে হবে)
router.get("/protected", authenticateToken, getProtectedData);

module.exports = router;
