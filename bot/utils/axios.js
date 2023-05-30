const axios = require('axios').default;

const local = axios.create({
  // baseURL: 'http://10.23.4.11:3002/api',
  baseURL: 'http://localhost:3002/api',
});

module.exports = local;
