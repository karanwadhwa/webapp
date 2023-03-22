import { Request, Response } from "express";
import statsD from "node-statsd";
import { getCommonURLIdentifier } from "../utils/common";

const statsdClient: statsD = new statsD();

const StatsDMiddleware = (req: Request, res?: Response, next?: Function) => {
  const metric = getCommonURLIdentifier(req);
  statsdClient.increment(metric);
  if (next) next();
};

export default StatsDMiddleware;
