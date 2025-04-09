/**
 * tnc controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::tnc.tnc', ({ strapi }) => ({
    async find(ctx) {
        const tnc = await strapi.db.query('api::tnc.tnc').findMany({
            where: {
                published_at: { $notNull: true },
                locale: ['en', 'id'],
            },
            populate: ["tnc"],
        })

        if (!tnc || tnc.length === 0) {
            return ctx.notFound('TnC not found');
        }

        const sanitizedEntity = await this.sanitizeOutput(tnc, ctx);
        return this.transformResponse(sanitizedEntity);
    },
}));
