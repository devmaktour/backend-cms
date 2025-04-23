module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/contact-us-form',
            handler: 'api::contact-us-form.contact-us-form.submit',
            config: {
                auth: false,
                middlewares: [
                    {
                        name: 'api::contact-us-form.rate-limit',
                    },
                ],

            },
        },
    ],
};