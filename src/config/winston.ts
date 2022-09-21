import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import * as fs from 'fs';

const env = process.env.NODE_ENV || 'development';
const logDir = 'logs';

// https://lovemewithoutall.github.io/it/winston-example/
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const dailyRotateFileTransport = new transports.DailyRotateFile({
  level: 'debug',
  filename: `${logDir}/%DATE%-smart-push.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

const logger = createLogger({
  level: env === 'development' ? 'debug' : 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.json(),
  ),
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`,
        ),
      ),
    }),
    dailyRotateFileTransport,
  ],
});

export default logger;
