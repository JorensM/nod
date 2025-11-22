const http = require('node:http');

const port = 8000;

const endpoints = {
  '/list': (req, res) => {

  },
  '/ping': (req, res) => {
    console.log('pinged')
    res.statusCode = 200;
    res.write('ok');
  }
}

const start = () => {
  const server = http.createServer((req, res) => {
    console.log('request received: ', req.url);
    const endpoint = new URL('http://localhost:' + port + req.url).pathname;
    if(endpoints[endpoint]) {
      endpoints[endpoint](req, res);
    } else {
      res.statusCode = 404;
    }
    res.end();
  });

  server.listen(port, null, null, () => {
      console.log('NoD server listening on 8000');
  });
}

module.exports = {
  start
}