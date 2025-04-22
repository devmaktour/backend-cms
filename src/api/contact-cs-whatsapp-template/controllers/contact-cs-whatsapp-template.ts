/**
 * contact-cs-whatsapp-template controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::contact-cs-whatsapp-template.contact-cs-whatsapp-template', ({ strapi }) => ({
    async find(ctx) {
        const template = await strapi.db.query('api::contact-cs-whatsapp-template.contact-cs-whatsapp-template').findMany({
            where: {
                publishedAt: { $notNull: true },
                locale: ['en', 'id'],
            }
        });

        if (!template || template.length === 0) {
            return ctx.notFound('Contact CS Whatsapp Template not found');
        }

        const sanitizedEntity = await this.sanitizeOutput(template, ctx);
        return this.transformResponse(sanitizedEntity);
    },
}));
