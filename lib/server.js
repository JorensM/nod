import http from 'node:http';
import NodeClient from './nodeClient.js';
import { Server } from 'socket.io';
import Message from './Message.js';
// const http = require('node:http');
// const NodeClient = require('./nodeClient');
// const { Server } = require('socket.io');
// const Message = require('./Message');

const client = new NodeClient();

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
    // console.log(req.headers);
    const origin = req.headers?.origin && new URL(req.headers.origin).hostname;
    if(origin && ['localhost', '127.0.0.1'].includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
    }
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

  const io = new Server(server, {
    cors: {
      'exposedHeaders': 'Access-Control-Allow-Origin'
    }
  });

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (messageStr) => {
      const message = Message.parse(messageStr);
      console.log('received message: ', message);
      io.emit('message', messageStr);
      // Todo io.broadcast only to receiving devices
    })
    devices.push(socket.id);
  });

  server.listen(port, null, null, () => {
      console.log('nod server listening on 8000');
  });

  client.setName('server');
  client.connect();
}

export default { start };