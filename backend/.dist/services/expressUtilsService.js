"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logEndpoints = void 0;
const logger = __importStar(require("./loggingService"));
function printRoutes(routes, basePath = '') {
    routes.forEach((route) => {
        if (route.route) {
            const methods = Object.keys(route.route.methods)
                .map(method => method.toUpperCase())
                .join(', ');
            logger.info(`${methods} ${basePath}${route.route.path}`);
        }
        else if (route.handle && route.handle.name === 'router') {
            const routerPath = route.regexp
                .toString()
                .replace('/^', '')
                .replace('\\/?(?=\\/|$)', '')
                .replace('/i', '')
                .replace('/$', '');
            printRoutes(route.handle.stack, `${basePath}${routerPath}`);
        }
    });
}
function logEndpoints(app) {
    logger.info('Registered endpoints:');
    printRoutes(app._router.stack);
}
exports.logEndpoints = logEndpoints;
//# sourceMappingURL=expressUtilsService.js.map