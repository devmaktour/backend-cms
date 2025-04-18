/**
 * `cu-customer-user-api-token-validation` middleware
 */

import type { Core } from '@strapi/strapi';
import { Context, Next } from 'koa';
import { LOG } from '../../../utils/logger';

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: Context, next: Next) => {
    LOG.info(ctx, 'In cu-customer-user-api-token-validation middleware.');

    const apiToken = ctx.request.headers['x-api-token'];
    const staticApiToken = process.env.CU_CUSTOMER_USER_API_TOKEN;

    if (!apiToken || apiToken !== staticApiToken) {
      return ctx.throw(401, 'Unauthorized');
    }

    await next();
  };
};

