import express from "express";
import { validationResult } from "express-validator";
import { AuthenticatedRequest } from "../middlewares/AuthMiddleware";

class RootController {
  constructor() {}

  checkValidationErrors = (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction
  ): express.Response => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
      return res.status(400).json({ errors: validationErrors.array() });
    else next();
  };
}

export default RootController;
