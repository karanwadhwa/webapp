import dotenv from "dotenv";
import app from "./api/app";
import { initializeDatabase } from "./api/models";
import logger from "./api/utils/logger";

dotenv.config();

const PORT = process.env.API_PORT || "5000";

initializeDatabase().then((req) => {
  app.listen(PORT, () => logger().info(`server started on http://localhost:${PORT}`));
});
