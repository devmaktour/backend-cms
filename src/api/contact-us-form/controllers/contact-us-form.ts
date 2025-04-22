/**
 * contact-us-form controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::contact-us-form.contact-us-form', ({ strapi }) => ({
    async submit(ctx) {
        try {
            const { name, email, phoneNumber, question } = ctx.request.body;

            if (!name || !email || !question) {
                return ctx.badRequest('Missing required fields: name, email, and question');
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return ctx.badRequest('Invalid email format');
            }

            // validate phone number only numeric
            if (phoneNumber != undefined && !/^\d+$/.test(phoneNumber)) {
                return ctx.badRequest('Phone number must be numeric');
            }

            const entry = await strapi.db.query('api::contact-us-form.contact-us-form').create({
                data: {
                    name,
                    email,
                    phoneNumber,
                    question
                },
            });

            ctx.body = { data: entry };
        } catch (error) {
            strapi.log.error('Contact Us form submission error:', error);
            ctx.throw(500, 'Internal server error');
        }
    },
}));
