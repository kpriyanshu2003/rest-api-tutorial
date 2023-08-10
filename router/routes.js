const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/User");

// get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET specific user by email
router.get("/:email", async (req, res) => {
  const userEmail = req.params.email;
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST a new user
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User Already Exists! Login Instead" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    return res.status(201).json({ user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// PUT update user by email
router.put("/:email", async (req, res) => {
  const userEmail = req.params.email;
  const { name, email, password } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email: userEmail },
      { name, email, password },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE user by email
router.delete("/:email", async (req, res) => {
  const userEmail = req.params.email;
  try {
    const user = await User.findOneAndDelete({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully", user });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
