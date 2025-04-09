/**
 * privacy-policy controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::privacy-policy.privacy-policy',
    ({ strapi }) => ({
        async find(ctx) {
            const privacyPolicy = await strapi.db.query('api::privacy-policy.privacy-policy').findMany({
                where: {
                    published_at: { $notNull: true },
                    locale: ['en', 'id'],
                },
                populate: ["policy"],
            })

            if (!privacyPolicy || privacyPolicy.length === 0) {
                return ctx.notFound('Privacy policy not found');
            }

            const sanitizedEntity = await this.sanitizeOutput(privacyPolicy, ctx);
            return this.transformResponse(sanitizedEntity);
        },
    })
);
