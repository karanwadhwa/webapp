import winston from "winston";

const { combine, timestamp, label, printf, colorize } = winston.format;
const printFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] [${level}]: ${message}`;
});

const logger = (
  labelOptions: winston.Logform.LabelOptions = { label: "Application" },
  format: winston.Logform.Format = printFormat
) =>
  winston.createLogger({
    level: "http",
    format: combine(
      colorize(),
      label(labelOptions),
      timestamp({
        format: "YYYY-MM-DD hh:mm:ss.SSS A",
      }),
      format
    ),
    transports: [new winston.transports.Console()],
  });

export default logger;
