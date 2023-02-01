require("dotenv").config();
const express = require("express");

const app = express();

// Middleware
app.use(express.json({ extended: true }));

// Health check route
app.get("/healthz", (req, res) => {
  return res.sendStatus(500);
});

module.exports = app;
