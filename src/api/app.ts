// import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";

const app: Application = express();

// Middleware
app.use(express.json());

// Health check endpoint
app.get("/healthz", (req: Request, res: Response) => {
  res.sendStatus(200);
});

export default app;
