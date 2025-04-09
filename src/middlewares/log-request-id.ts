/**
 * `log-request-id` middleware
 */

import type { Core } from '@strapi/strapi';
import { v4 as uuidv4 } from 'uuid';

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
    // Generate a unique request ID if it doesn't exist
    const requestId = (ctx.request.headers['x-request-id'] as string) || uuidv4();
    const startTime = Date.now();

    // Attach the request ID to the context state
    ctx.state.requestId = requestId;

    // Log the start of the request
    strapi.log.info(`[${requestId}] Request received: ${ctx.method} ${ctx.url}`);

    try {
      await next();
      const endTime = Date.now();
      const duration = endTime - startTime;

      // Log the end of the request with duration
      strapi.log.info(`[${requestId}] Request completed: ${ctx.status} (${duration}ms)`);
    } catch (error: any) {
      const endTime = Date.now();
      const duration = endTime - startTime;
      strapi.log.error(`[${requestId}] Request failed: ${error.message} (${duration}ms)`, error);
      throw error;
    }
  };
};