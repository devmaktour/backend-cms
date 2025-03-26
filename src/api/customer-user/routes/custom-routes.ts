module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/customer-users/create-user',
        handler: 'api::customer-user.customer-user.createUser',
        config: {
          auth: false, // TODO: recheck auth
        },
      },
      {
        method: 'POST',
        path: '/customer-users/subscribe-email',
        handler: 'api::customer-user.customer-user.subscribeEmail',
        config: {
          auth: false, // TODO: recheck auth
        },
      },
    ],
  };