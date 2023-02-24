// import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import UserRouter from "./routes/UserRoutes";
import ProductRouter from "./routes/ProductRoutes";
import ImageRouter from "./routes/ImageRoutes";

const app: Application = express();

// Middleware
app.use(express.json());

// Health check endpoint
app.get("/healthz", (req: Request, res: Response) => {
  res.sendStatus(200);
});

app.use("/v1/user", UserRouter);
app.use("/v1/product", ProductRouter);
app.use(`/v1/product/:productId/image`, ImageRouter);

export default app;
