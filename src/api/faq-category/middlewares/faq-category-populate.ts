/**
 * `faq-category-populate` middleware
 */

import type { Core } from '@strapi/strapi';

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In faq-category-populate middleware.');
    ctx.query = {
      status: 'published',
      locale: '*',
      ...ctx.query,
    }

    await next();
  };
};
