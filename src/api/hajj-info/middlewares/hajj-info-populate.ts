/**
 * `hajj-info-populate` middleware
 */

import type { Core } from '@strapi/strapi';

const populate = {
  content: {
    populate: {
      media: {
        populate: '*'
      }
    }
  }
}

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
    strapi.log.info('In hajj-info-populate middleware.');
    ctx.query = {
      populate: populate,
      status: 'published',
      ...ctx.query,
    }

    await next();
  };
};
