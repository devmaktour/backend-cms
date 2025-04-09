/**
 * `blog-populate` middleware
 */

import type { Core } from '@strapi/strapi';
import { LOG } from '../../../utils/logger';

const populate = ['coverImage.file']

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
    LOG.info(ctx, 'In blog-populate middleware.');
    ctx.query = {
      populate: populate,
      status: 'published',
      locale: '*',
      ...ctx.query,
    }

    await next();
  };
};
