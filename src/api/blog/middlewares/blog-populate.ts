/**
 * `blog-populate` middleware
 */

import type { Core } from '@strapi/strapi';

const populate = ['coverImage.file']

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
    strapi.log.info('In blog-populate middleware.');
    ctx.query = {
      populate: populate,
      status: 'published',
      locale: '*',
      ...ctx.query,
    }

    await next();
  };
};
