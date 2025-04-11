/**
 * `customer-service-contact-populate` middleware
 */

import type { Core } from '@strapi/strapi';
const populate = ['photo.photo']

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In customer-service-contact-populate middleware.');
    ctx.query = {
      populate: populate,
      locale: '*',
      ...ctx.query,
    }

    await next();
  };
};
