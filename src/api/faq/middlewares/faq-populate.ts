/**
 * `faq-populate` middleware
 */

import type { Core } from '@strapi/strapi';

const populate = ['faqCategory']

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In faq-populate middleware.');
    ctx.query = {
      populate: populate,
      status: 'published',
      locale: '*',
      ...ctx.query,
    }

    await next();
  };
};
