/**
 * package router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::package.package', {
    config: {
        find: {
            middlewares: ['api::package.package-populate']
        },
        findOne: {
            middlewares: ['api::package.package-populate-one']
        }
    }
});
