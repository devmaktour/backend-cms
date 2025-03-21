/**
 * gallery router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::gallery.gallery', {
    config: {
        find: {
            middlewares: ['api::gallery.gallery-populate']
        }
    }
});
