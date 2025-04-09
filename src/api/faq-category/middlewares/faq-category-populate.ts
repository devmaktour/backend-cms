/**
 * `faq-category-populate` middleware
 */

import type { Core } from '@strapi/strapi';
import { LOG } from '../../../utils/logger';

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
    LOG.info(ctx, 'In faq-category-populate middleware.');
    ctx.query = {
      status: 'published',
      locale: '*',
      ...ctx.query,
    }

    await next();
  };
};
