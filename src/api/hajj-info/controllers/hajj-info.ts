/**
 * hajj-info controller
 */

import { factories } from '@strapi/strapi'


export default factories.createCoreController('api::hajj-info.hajj-info', ({ strapi }) => ({
    async find(ctx) {
        const hajjInfo = await strapi.db.query('api::hajj-info.hajj-info').findMany({
            where: {
                publishedAt: { $notNull: true },
                locale: ['en', 'id'],
            },
            populate: ["content.media", "content.media.file"],
        });

        if (!hajjInfo || hajjInfo.length === 0) {
            return ctx.notFound('Hajj Info not found');
        }

        const sanitizedEntity = await this.sanitizeOutput(hajjInfo, ctx);
        return this.transformResponse(sanitizedEntity);
    },
}));
