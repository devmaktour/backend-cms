/**
 * `tnc-populate` middleware
 */

import type { Core } from '@strapi/strapi';

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In tnc-populate middleware.');
    ctx.query = {
      status: 'published',
      ...ctx.query,
    }

    await next();
  };
};
