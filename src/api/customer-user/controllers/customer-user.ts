/**
 * customer-user controller
 */

import { factories } from '@strapi/strapi'
import { Context } from 'koa';
import { LOG } from '../../../utils/logger';

export default factories.createCoreController('api::customer-user.customer-user', ({ strapi }) => ({
    async createUser(ctx: Context) {
        try {
            const { name, email, phoneNumber, isSubscribeEmail } = ctx.request.body;

            // Check if email already exists
            const existingUser = await strapi.db.query('api::customer-user.customer-user').findOne({
                where: { email: email },
            });
            if (existingUser) {
                return ctx.badRequest('Email already exists');
            }

            // validate phone number only numeric
            if (phoneNumber != undefined && !/^\d+$/.test(phoneNumber)) {
                return ctx.badRequest('Phone number must be numeric');
            }

            const customerUser = await strapi.db.query('api::customer-user.customer-user').create({
                data: {
                    name,
                    email,
                    phoneNumber,
                    isSubscribeEmail: isSubscribeEmail || false,
                },
            });

            ctx.body = customerUser;
        } catch (error) {
            ctx.throw(500, error);
        }
    },

    async subscribeEmail(ctx: Context) {
        try {
            const { email } = ctx.request.body;

            // Check if user exists
            const existingUser = await strapi.db.query('api::customer-user.customer-user').findOne({
                where: { email: email },
            });
            if (existingUser && existingUser.isSubscribeEmail) {
                LOG.info(ctx, 'User '+ email+ ' is already subscribed');
                return ctx.body = existingUser;
            }

            let customerUser;

            if (!existingUser) {
                // Create new user if not exists
                customerUser = await strapi.db.query('api::customer-user.customer-user').create({
                    data: {
                        email,
                        isSubscribeEmail: true,
                    },
                });
            } else {
                // Update existing user if exists
                customerUser = await strapi.db.query('api::customer-user.customer-user').update({
                    where: { id: existingUser.id },
                    data: {
                        isSubscribeEmail: true,
                    },
                });
                LOG.info(ctx, 'updated user '+ JSON.stringify(customerUser));
            }

            ctx.body = customerUser;
        } catch (error) {
            ctx.throw(500, error);
        }
    },
}));
