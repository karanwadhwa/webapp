const express = require("express");

const app = express();
const PORT = "3000";

app.listen(PORT, () => console.log(`server started on http://localhost:${PORT}`));

app.get("/healthz", (req, res) => {
  res.sendStatus(200);
})