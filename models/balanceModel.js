// models/balanceModel.js
const mongoose = require("mongoose");

const balanceSchema = new mongoose.Schema({
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    default: 0, // Positive if owed, negative if owing
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Balance = mongoose.model("Balance", balanceSchema);

module.exports = Balance;
