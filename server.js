const http = require('node:http');

const port = 8000;

const server = http.createServer((req, res) => {
  res.end();
});

server.listen(port, null, null, () => {
    console.log('NoD server listening on 8000');
});