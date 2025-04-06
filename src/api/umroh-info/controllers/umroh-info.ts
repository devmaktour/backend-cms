/**
 * umroh-info controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::umroh-info.umroh-info', ({ strapi }) => ({
    async find(ctx) {
        const umrohInfo = await strapi.db.query('api::umroh-info.umroh-info').findMany({
            where: {
                publishedAt: { $notNull: true },
                locale: ['en', 'id'],
            },
            populate: ["content.media", "content.media.file"],
        });

        if (!umrohInfo || umrohInfo.length === 0) {
            return ctx.notFound('Umroh Info not found');
        }

        const sanitizedEntity = await this.sanitizeOutput(umrohInfo, ctx);
        return this.transformResponse(sanitizedEntity);
    },
}));
