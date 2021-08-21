const axios = require('axios');

const _axios = axios.create({
  // baseURL: "https://localhost:3000/",
  timeout: 3000
})

module.exports = _axios;