// import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import UserRouter from "./routes/UserRoutes";

const app: Application = express();

// Middleware
app.use(express.json());

// Health check endpoint
app.get("/healthz", (req: Request, res: Response) => {
  res.sendStatus(200);
});

app.use("/v1/user", UserRouter);

export default app;
