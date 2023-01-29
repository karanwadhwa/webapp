const express = require("express");

const app = express();
const PORT = "3000";

// Middleware
app.use(express.json({ extended: true }));

// Health check route
app.get("/healthz", (req, res) => {
  res.sendStatus(200);
});

// Route definitions
app.use("/v1/user", require("./src/routes/user"));

app.listen(PORT, () => console.log(`server started on http://localhost:${PORT}`));
