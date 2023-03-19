// import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import winston from "winston";
import morgan from "morgan";

import UserRouter from "./routes/UserRoutes";
import ProductRouter from "./routes/ProductRoutes";

const app: Application = express();

const { combine, timestamp, json } = winston.format;
const logger = winston.createLogger({
  level: "http",
  format: combine(
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    json()
  ),
  transports: [new winston.transports.Console()],
});

const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  {
    write: (message: String): winston.Logger => logger.http(message.trim()),
  }
);

// Middleware
app.use(express.json());
app.use(morganMiddleware);

// Health check endpoint
app.get("/healthz", (req: Request, res: Response) => {
  res.sendStatus(200);
});

app.use("/v1/user", UserRouter);
app.use("/v1/product", ProductRouter);

export default app;
