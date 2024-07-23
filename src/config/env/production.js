// config/env/production.js
require('dotenv').config();
module.exports = {
  port: process.env.PORT || 1337,
  datastores: {
    default: {
      adapter: 'sails-postgresql',
      url: process.env.DATABASE_URL,
      ssl: true,
    },
  },
  sockets: {
    onlyAllowOrigins: [
      "https://two024-1b-t12-in02-g05-3.onrender.com",
    ],
  },
  session: {
    cookie: {
      secure: true,
    }
  },
  http: {
    trustProxy: true,
  }
};
