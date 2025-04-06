import { clearCacheForKeyPrefix, generateCacheKeyFromModel } from '../middlewares/cache';
import redisClient from './redis';

const contentTypesToInvalidate = [
    'api::blog.blog',
    'api::customer-user.customer-user',
    'api::faq.faq',
    'api::faq-category.faq-category',
    'api::gallery.gallery',
    'api::hajj-info.hajj-info',
    'api::tnc.tnc',
    'api::umroh-info.umroh-info',
];

const attachLifecycleHooks = (contentType: string) => {
    const parts = contentType.split('.');
    const modelName = parts[1];
    const cachePrefix = generateCacheKeyFromModel(modelName);
    if (!cachePrefix) {
        strapi.log.warn(`Cache prefix not generated for ${contentType}`);
        return;
    }

    strapi.log.info(`Attaching lifecycle hooks for ${contentType} with cache prefix: ${cachePrefix}`);

    if (strapi.db.lifecycles) {
        strapi.db.lifecycles.subscribe({
            afterDelete: async (event) => {
                if (event.model.uid === contentType) {
                    strapi.log.info(`Cache with prefix ${cachePrefix} evicted for ${contentType} after delete`);
                    await clearCacheForKeyPrefix(cachePrefix);
                }
            },
            afterDeleteMany: async (event) => {
                if (event.model.uid === contentType) {
                    strapi.log.info(`Cache with prefix ${cachePrefix} evicted for ${contentType} after delete many`);
                    await clearCacheForKeyPrefix(cachePrefix);
                }
            },
            afterUpdate: async (event) => {
                if (event.model.uid === contentType) {
                    strapi.log.info(`Cache with prefix ${cachePrefix} evicted for ${contentType} after update`);
                    await clearCacheForKeyPrefix(cachePrefix);
                }
            },
            afterUpdateMany: async (event) => {
                if (event.model.uid === contentType) {
                    strapi.log.info(`Cache with prefix ${cachePrefix} evicted for ${contentType} after update many`);
                    await clearCacheForKeyPrefix(cachePrefix);
                }
            },
        });
    }
};

const setupGlobalLifecycleHooks = () => {
    contentTypesToInvalidate.forEach(attachLifecycleHooks);
};

export default setupGlobalLifecycleHooks;