
// const http = require('node:http');
// const NodeClient = require('./nodeClient');
// const { Server } = require('socket.io');
// const Message = require('./Message');

class BaseServer {

  devices = [];
  sockets = {};
  client;
  port = 8000;
  
  start = () => {};

  getDeviceByName = (name) => {
    return this.devices.find((device) => {
      return device.name === name;
    })
  }

  formatResponse = (data, message = 'ok', status = 200) => {
    return {
      message,
      data,
      status
    };
  }

  endpoints = {
    '/devices': async (req, res, url) => { // List devices on the network
      // res.statusCode = 200;
      const name = url.searchParams.get('name');
      console.log('received device request for: ' + name);
      if(name) {
        const device = this.getDeviceByName(name);
        console.log('data: ', device);
        if(!device) {
          return this.formatResponse(null, 'device not found', 404);
        }
        return this.formatResponse(device);
      } else {
        return this.formatResponse(this.devices);
      }
    },
    // '/devices/files': async (req, res, url) => {
    //   const name = url.searchParams.get('name');
    //   const device = this.getDeviceByName(name);
    //   // console.log('data: ', device);
    //   if(!device) {
    //     return this.formatResponse(null, 'device not found', 404);
    //   }      
    // },
    // '/connect': async (req, res) => {
      // console.log('device connected: ', data.name);
      // devices.push(data);
      // res.statusCode = 200;
      // return {

      // }
      // req.on('data', (chunk) => {
      //   const data = JSON.parse(chunk);
        
      // })
    // },
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

    },
    '/register': async (req, res, url) => {
      const { data } = req;
      console.log(data);
      if(this.getDeviceByName(data.name)) {
        return this.formatResponse(null, 'device already registered');
      } else {
        this.devices.push(data);
        return this.formatResponse(null, 'device registered');
      }
    }
  }
}

export default BaseServer;