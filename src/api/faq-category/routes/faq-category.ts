/**
 * faq-category router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::faq-category.faq-category', {
    config: {
        find: {
            middlewares: ['api::faq-category.faq-category-populate']
        }
    }
});
