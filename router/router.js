const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controller/categoryController");

const router = express.Router();

// POST - নতুন ইউজার তৈরি
router.post("/", createUser);

// GET - সকল ইউজার আনা
router.get("/", getAllUsers);

// GET - নির্দিষ্ট ইউজার আইডি দিয়ে আনা
router.get("/:id", getUserById);

// PUT - ইউজার আপডেট করা
router.put("/:id", updateUser);

// DELETE - ইউজার মুছে ফেলা
router.delete("/:id", deleteUser);

module.exports = router;
