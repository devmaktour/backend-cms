module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/customer-users/create-user',
      handler: 'api::customer-user.customer-user.createUser',
      config: {
        middlewares: ['api::customer-user.cu-customer-user-api-token-validation'],
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/customer-users/subscribe-email',
      handler: 'api::customer-user.customer-user.subscribeEmail',
      config: {
        middlewares: ['api::customer-user.cu-customer-user-api-token-validation'],
        auth: false,
      },
    },
  ],
};