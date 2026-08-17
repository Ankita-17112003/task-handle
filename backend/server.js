require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");

const app = express();
const connection = require("./config/db");
const taskSchema = require("./models/Task");
// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);

// Health check route (deployment ke baad test karne ke liye)
app.get("/", (req, res) => {
  res.json({ message: "Task Manager API is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

