// routes/groupRoutes.js
const express = require("express");
const Group = require("../models/groupModel");
const User = require("../models/userModel");

const router = express.Router();

// Create a group
router.post("/", async (req, res) => {
  const { name, members } = req.body;

  try {
    const group = new Group({
      name,
      members,
    });

    await group.save();

    res.json(group);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get all groups of a user
router.get("/", async (req, res) => {
  try {
    const groups = await Group.find({ members: req.user.id });
    res.json(groups);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get details of a specific group
router.get("/:id", async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate(
      "members",
      "name email"
    );
    if (!group) {
      return res.status(404).json({ msg: "Group not found" });
    }
    res.json(group);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
