/**
 * `package-populate` middleware
 */

import type { Core } from '@strapi/strapi';
import { LOG } from '../../../utils/logger';

export const populate = ['requirementDetail.media.file', 'accommodationDetail.media.file', 'cancellationPolicy.media.file', 'additionalInfos.media.file']

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
    LOG.info(ctx, 'In package-populate middleware.');

    ctx.query = {
      populate: populate,
      status: 'published',
      locale: '*',
      ...ctx.query,
    }

    await next();
  };
};
