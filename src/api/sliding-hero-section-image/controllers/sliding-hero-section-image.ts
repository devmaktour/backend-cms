/**
 * sliding-hero-section-image controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::sliding-hero-section-image.sliding-hero-section-image', ({
    async find(ctx) {
        const images = await strapi.db.query('api::sliding-hero-section-image.sliding-hero-section-image').findMany({
            where: {
                publishedAt: { $notNull: true },
            },
            populate: ["images.photo", "images.photo.file"],
        });

        if (!images || images.length === 0) {
            return ctx.notFound('Sliding hero section images not found');
        }

        const sanitizedEntity = await this.sanitizeOutput(images, ctx);
        return this.transformResponse(sanitizedEntity);
    },
}));
