const User = require("../models/userModel");
async function createUser(data) {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) throw new Error("User with this email already exists");

  const user = new User(data);
  await user.save();
  return user;
}

async function getUserById(id) {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");
  return user;
}

async function updateUser(id, data) {
  const session = await User.startSession(); // Starting a session for a transaction
  session.startTransaction();

  try {
    const user = await User.findByIdAndUpdate(id, data, { new: true, session });
    if (!user) throw new Error("User not found");

    await session.commitTransaction(); // Commit the transaction
    session.endSession();
    return user;
  } catch (err) {
    await session.abortTransaction(); // Rollback if something goes wrong
    session.endSession();
    throw err;
  }
}

async function deleteUser(id) {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error("User not found");
  return user;
}

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
