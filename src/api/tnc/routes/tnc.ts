/**
 * tnc router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::tnc.tnc', {
    config: {
        find: {
            middlewares: ['api::tnc.tnc-populate']
        }
    }
});
