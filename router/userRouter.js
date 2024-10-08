const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// Create a new user
router.post("/", userController.createUser);

// Get a user by ID
router.get("/:id", userController.getUserById);

// Update a user by ID
router.put("/:id", userController.updateUser);

// Delete a user by ID
router.delete("/:id", userController.deleteUser);

module.exports = router;
