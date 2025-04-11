/**
 * customer-service-contact router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::customer-service-contact.customer-service-contact', {
    config: {
        find: {
            middlewares: ['api::customer-service-contact.customer-service-contact-populate']
        },
    }
});

