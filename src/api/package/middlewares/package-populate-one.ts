/**
 * `package-populate-one` middleware
 */

import type { Core } from '@strapi/strapi';
import { populate } from './package-populate';

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
    strapi.log.info('In package-populate-one middleware.');

    ctx.query = {
      populate: populate,
      status: 'published',
      ...ctx.query,
    }

    await next();
  };
};
