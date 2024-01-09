// logger.js
const winston = require('winston')
require('winston-daily-rotate-file')

const transportError = new winston.transports.DailyRotateFile({
  filename: './%DATE%error.log',
  // filename: '/usr/local/project/log/thread/%DATE%errorv1start.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'error', // 只记录 error 及其以上级别的日志
})

const transportCommon = new winston.transports.DailyRotateFile({
  filename: './%DATE%common.log',
  // filename: '/usr/local/project/log/thread/%DATE%commonv1start.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'info', // 记录所有 info 及其以上级别的日志
})

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [transportError, transportCommon],
})

module.exports = logger
