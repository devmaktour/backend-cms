/**
 * hajj-info router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::hajj-info.hajj-info',
    {
        config: {
            find: {
                middlewares: ['api::hajj-info.hajj-info-populate']
            }
        }
    }
);
