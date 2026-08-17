require("dotenv").config();
const express = require("express");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());

// Ensure DB is connected before handling any request (serverless-safe)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: "Database connection failed" });
  }
});

// Routes
app.use("/api/tasks", taskRoutes);

// Health check route (deployment ke baad test karne ke liye)
app.get("/", (req, res) => {
  res.json({ message: "Task Manager API is running" });
});

module.exports = app;

// Local development: run a normal server only when NOT on Vercel
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  });
}