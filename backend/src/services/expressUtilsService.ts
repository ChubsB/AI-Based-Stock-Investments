import { Express } from 'express';
import * as logger from './loggingService';

function printRoutes(routes: any[], basePath = ''): void {
  routes.forEach((route: any) => {
    if (route.route) {
      const methods = Object.keys(route.route.methods)
        .map(method => method.toUpperCase())
        .join(', ');
        logger.info(`${methods} ${basePath}${route.route.path}`);
    } else if (route.handle && route.handle.name === 'router') {
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

export function logEndpoints(app: Express): void {
  logger.info('Registered endpoints:')
  printRoutes(app._router.stack);
}