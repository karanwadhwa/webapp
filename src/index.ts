import dotenv from "dotenv";
import app from "./api/app";
import { initializeDatabase } from "./api/models";

dotenv.config();

const PORT = process.env.API_PORT || "5000";

initializeDatabase().then((req) => {
  app.listen(PORT, () => console.log(`server started on http://localhost:${PORT}`));
});
