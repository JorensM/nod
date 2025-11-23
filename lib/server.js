const http = require('node:http');
const client = require('./client');
const { Server } = require('socket.io');

const port = 8000;

let devices = [];
let sockets = {};

const getDeviceByName = (name) => {
  return devices.find((device) => {
    return device.name === name;
  })
}

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
  },
  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @param { URL } url 
   */
  '/view': async (req, res, url) => {
    const deviceName = url.searchParams.get('name');
    const device = getDeviceByName(deviceName);
    if(!device){
      res.statusCode = 404;
      res.write(formatResponse(null, 'device not found'));
    } else {
      res.statusCode = 200;
      res.write(formatResponse(device, 'ok'));
    }
  },
  '/files': async (req, res, url) => {
    const deviceName = url.searchParams.get('device');

  }
}

const start = () => {
  const server = http.createServer((req, res) => {
    console.log('request received: ', req.url);
    const url = new URL('http://localhost:' + port + req.url);
    const endpoint = url.pathname;
    if(endpoints[endpoint]) {
      endpoints[endpoint](req, res, url).then(() => {
        res.end();
      });
    } else {
      res.statusCode = 404;
    }
    // req.on('end', () => {
    //   res.end();
    // })
  });

  const io = new Server(server);

  io.on('connection', (socket) => {
    sockets.push(socket);
    console.log('a user connected');
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