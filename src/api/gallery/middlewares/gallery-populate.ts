/**
 * `gallery-populate` middleware
 */

import type { Core } from '@strapi/strapi';
import { LOG } from '../../../utils/logger';

const populate = ['media.file']

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
    LOG.info(ctx, 'In gallery-populate middleware.');
    ctx.query = {
      populate: populate,
      status: 'published',
      locale: '*',
      ...ctx.query,
    }

    await next();
  };
};
