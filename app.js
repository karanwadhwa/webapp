require("dotenv").config();
const express = require("express");

const app = express();

// Middleware
app.use(express.json({ extended: true }));

// Health check route
app.get("/healthz", (req, res) => {
  res.sendStatus(200);
});

module.exports = app;
