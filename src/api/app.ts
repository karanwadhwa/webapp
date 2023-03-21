// import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import winston from "winston";
import morgan from "morgan";
import statsD from "node-statsd";

import UserRouter from "./routes/UserRoutes";
import ProductRouter from "./routes/ProductRoutes";

const app: Application = express();
const statsdClient: statsD = new statsD();

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

const statsDMiddleware = (req, res, next) => {
  statsdClient.increment(`${req.method} ${req.url}`);
  next();
};

// Middleware
app.use(express.json());
app.use(morganMiddleware);
app.use(statsDMiddleware);

// Health check endpoint
app.get("/healthz", (req: Request, res: Response) => {
  res.sendStatus(200);
});

app.use("/v1/user", UserRouter);
app.use("/v1/product", ProductRouter);

export default app;
