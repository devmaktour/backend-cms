/**
 * `package-populate` middleware
 */

import type { Core } from '@strapi/strapi';

export const populate = ['requirementDetail.media.file', 'accommodationDetail.media.file', 'cancellationPolicy.media.file', 'additionalInfos.media.file']

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
    strapi.log.info('In package-populate middleware.');

    ctx.query = {
      populate: populate,
      status: 'published',
      locale: '*',
      ...ctx.query,
    }

    await next();
  };
};
