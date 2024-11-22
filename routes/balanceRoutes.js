// routes/balanceRoutes.js
const express = require("express");
const Balance = require("../models/balanceModel");
const Group = require("../models/groupModel");
const Transaction = require("../models/transactionModel");

const router = express.Router();

// Get the balance summary for a group
router.get("/:groupId", async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) {
      return res.status(404).json({ msg: "Group not found" });
    }

    // Get balances for each user
    const balances = await Balance.find({ group: req.params.groupId }).populate(
      "user",
      "name email"
    );
    res.json(balances);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get balance for a user in a specific group
router.get("/:groupId/:userId", async (req, res) => {
  try {
    const balance = await Balance.findOne({
      group: req.params.groupId,
      user: req.params.userId,
    });
    if (!balance) {
      return res.status(404).json({ msg: "Balance not found" });
    }
    res.json(balance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
