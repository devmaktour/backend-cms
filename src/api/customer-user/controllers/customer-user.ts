/**
 * customer-user controller
 */

import { factories } from '@strapi/strapi'
import { Context } from 'koa';
import { LOG } from '../../../utils/logger';

export default factories.createCoreController('api::customer-user.customer-user', ({ strapi }) => ({
    async createUser(ctx: Context) {
        try {
            const { name, email, phone_number } = ctx.request.body;

            // Check if email already exists
            const existingUser = await strapi.db.query('api::customer-user.customer-user').findOne({
                where: { email: email },
            });
            if (existingUser) {
                return ctx.badRequest('Email already exists');
            }

            // validate phone number only numeric
            if (phone_number != undefined && !/^\d+$/.test(phone_number)) {
                return ctx.badRequest('Phone number must be numeric');
            }

            const customerUser = await strapi.db.query('api::customer-user.customer-user').create({
                data: {
                    name,
                    email,
                    phone_number,
                    is_subscribe_email: false,
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
            if (existingUser && existingUser.is_subscribe_email) {
                LOG.info(ctx, 'User '+ email+ ' is already subscribed');
                return ctx.body = existingUser;
            }

            let customerUser;

            if (!existingUser) {
                // Create new user if not exists
                customerUser = await strapi.db.query('api::customer-user.customer-user').create({
                    data: {
                        email,
                        is_subscribe_email: true,
                    },
                });
            } else {
                // Update existing user if exists
                customerUser = await strapi.db.query('api::customer-user.customer-user').update({
                    where: { id: existingUser.id },
                    data: {
                        is_subscribe_email: true,
                    },
                });
            }

            ctx.body = customerUser;
        } catch (error) {
            ctx.throw(500, error);
        }
    },
}));
