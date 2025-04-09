/**
 * `faq-populate` middleware
 */

import type { Core } from '@strapi/strapi';
import { LOG } from '../../../utils/logger';

const populate = ['faqCategory']

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
    LOG.info(ctx, 'In faq-populate middleware.');
    ctx.query = {
      populate: populate,
      status: 'published',
      locale: '*',
      ...ctx.query,
    }

    await next();
  };
};
