/**
 * package controller
 */

import { factories } from '@strapi/strapi'
import { convertUsdToIdr } from '../../../utils/currency';

export default factories.createCoreController('api::package.package', ({ strapi }) => ({
    async find(ctx) {
        const result = await super.find(ctx);
        const { data } = result;

        await Promise.all(
            data.map(async (item) => {
                if (item && item.priceInUsd) {
                    const priceInIdr = await convertUsdToIdr(ctx, item.priceInUsd);
                    if (priceInIdr) {
                        item.priceInIdr = priceInIdr;
                    }
                }
            })
        );

        return result;
    },

    async findOne(ctx) {
        const data = await super.findOne(ctx);

        if (data && data.data && data.data.priceInUsd) {
            const priceInIdr = await convertUsdToIdr(ctx, data.data.priceInUsd);
            if (priceInIdr) {
                data.data.priceInIdr = priceInIdr;
            }
        }

        return data;
    }
}));
