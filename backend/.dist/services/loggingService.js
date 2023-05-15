"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debug = exports.info = exports.warn = exports.error = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel["ERROR"] = "error";
    LogLevel["WARN"] = "warn";
    LogLevel["INFO"] = "info";
    LogLevel["DEBUG"] = "debug";
})(LogLevel || (LogLevel = {}));
const name = 'App';
const logLevel = LogLevel.INFO;
function log(level, message, ...args) {
    const logLevelValues = Object.values(LogLevel);
    if (logLevelValues.indexOf(level) <= logLevelValues.indexOf(logLevel)) {
        console[level](`[${name} - ${level.toUpperCase()}]: ${message}`, ...args);
    }
}
function error(message, ...args) {
    log(LogLevel.ERROR, message, ...args);
}
exports.error = error;
function warn(message, ...args) {
    log(LogLevel.WARN, message, ...args);
}
exports.warn = warn;
function info(message, ...args) {
    log(LogLevel.INFO, message, ...args);
}
exports.info = info;
function debug(message, ...args) {
    log(LogLevel.DEBUG, message, ...args);
}
exports.debug = debug;
//# sourceMappingURL=loggingService.js.map