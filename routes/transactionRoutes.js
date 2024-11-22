// routes/transactionRoutes.js
const express = require("express");
const Transaction = require("../models/transactionModel");
const Group = require("../models/groupModel");

const router = express.Router();

// Add a transaction
router.post("/", async (req, res) => {
  const { description, amount, payer, group, participants } = req.body;

  try {
    const transaction = new Transaction({
      description,
      amount,
      payer,
      group,
      participants,
    });

    await transaction.save();

    res.json(transaction);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get all transactions for a group
router.get("/:groupId", async (req, res) => {
  try {
    const transactions = await Transaction.find({
      group: req.params.groupId,
    }).populate("payer", "name email");
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
