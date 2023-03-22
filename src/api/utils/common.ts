import { Request } from "express";

export const getCommonURLIdentifier = (req: Request): String => {
  return `${req.method} ${req.baseUrl}${req.route?.path}`;
};
