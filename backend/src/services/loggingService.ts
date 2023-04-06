enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

const name = 'App';
const logLevel: LogLevel = LogLevel.INFO;

function log(level: LogLevel, message: string, ...args: any[]): void {
  const logLevelValues = Object.values(LogLevel);
  if (logLevelValues.indexOf(level) <= logLevelValues.indexOf(logLevel)) {
    console[level](`[${name} - ${level.toUpperCase()}]: ${message}`, ...args);
  }
}

export function error(message: string, ...args: any[]): void {
  log(LogLevel.ERROR, message, ...args);
}

export function warn(message: string, ...args: any[]): void {
  log(LogLevel.WARN, message, ...args);
}

export function info(message: string, ...args: any[]): void {
  log(LogLevel.INFO, message, ...args);
}

export function debug(message: string, ...args: any[]): void {
  log(LogLevel.DEBUG, message, ...args);
}