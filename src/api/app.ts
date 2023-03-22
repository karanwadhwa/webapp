// import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import winston from "winston";

import UserRouter from "./routes/UserRoutes";
import ProductRouter from "./routes/ProductRoutes";
import logger from "./utils/logger";
import StatsDMiddleware from "./middlewares/StatsDMiddleware";

const app: Application = express();

const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  {
    write: (message: String): winston.Logger =>
      logger({ label: "Express" }).http(message.trim()),
  }
);

// Middleware
app.use(express.json());
app.use(morganMiddleware);

// Health check endpoint
app.get("/healthz", StatsDMiddleware, (req: Request, res: Response) => {
  res.sendStatus(200);
});

app.use("/v1/user", UserRouter);
app.use("/v1/product", ProductRouter);

export default app;
