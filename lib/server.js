const http = require('node:http');
const client = require('./client');

const port = 8000;

let devices = [];

const formatResponse = (data, message = 'ok') => {
  return JSON.stringify({
    message,
    data
  })
}

const endpoints = {
  '/list': async (req, res) => { // List devices on the network
    res.statusCode = 200;
    res.write(formatResponse(devices));
  },
  '/connect': async (req, res) => {
    req.on('data', (chunk) => {
      const data = JSON.parse(chunk);
      console.log('device connected: ', data.name);
      devices.push(data);
      res.statusCode = 200;
    })
  },
  '/ping': async (req, res) => {
    console.log('pinged')
    res.statusCode = 200;
    res.write(formatResponse(null, 'ok'));
  }
}

const start = () => {
  const server = http.createServer((req, res) => {
    console.log('request received: ', req.url);
    const endpoint = new URL('http://localhost:' + port + req.url).pathname;
    if(endpoints[endpoint]) {
      endpoints[endpoint](req, res).then(() => {
        res.end();
      });
    } else {
      res.statusCode = 404;
    }
    // req.on('end', () => {
    //   res.end();
    // })
  });

  server.listen(port, null, null, () => {
      console.log('NoD server listening on 8000');
  });

  client.setName('server');
  client.connect();
}

module.exports = {
  start
}