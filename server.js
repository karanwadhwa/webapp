require("dotenv").config();
const app = require("./app");
const PORT = process.env.API_PORT || "3000";

// Route definitions
app.use("/v1/user", require("./src/routes/user"));

app.listen(PORT, () => console.log(`server started on http://localhost:${PORT}`));
