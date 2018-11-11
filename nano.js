const fetch = require('node-fetch')

fetch('http://192.168.1.117:3333')
  .then(response => console.log(response))
  .catch(err => console.error(err))
