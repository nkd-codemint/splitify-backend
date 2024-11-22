// app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const groupRoutes = require("./routes/groupRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const balanceRoutes = require("./routes/balanceRoutes");
const { authenticate } = require("./middleware/authMiddleware");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // For handling cross-origin requests
app.use(express.json()); // For parsing JSON bodies

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/groups", authenticate, groupRoutes);
app.use("/api/transactions", authenticate, transactionRoutes);
app.use("/api/balances", authenticate, balanceRoutes);

// Root route (for testing)
app.get("/", (req, res) => {
  res.send("Welcome to Splitify!");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
