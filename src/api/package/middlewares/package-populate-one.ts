/**
 * `package-populate-one` middleware
 */

import type { Core } from '@strapi/strapi';
import { populate } from './package-populate';
import { LOG } from '../../../utils/logger';

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
    LOG.info(ctx,'In package-populate-one middleware.');

    ctx.query = {
      populate: populate,
      status: 'published',
      ...ctx.query,
    }

    await next();
  };
};
