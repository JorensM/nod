const http = require('node:http');
const { io, Socket } = require("socket.io-client");
const BaseClient = require('./client');
const fs = require('fs');
const Message = require('./Message');

const port = 8000;
/**
 * @type { Socket}
 */
let socket;

class NodeClient extends BaseClient {
    request = (path, data = null, method = 'GET') => {
        return new Promise((resolve, reject) => {
            // const url = 'http://localhost:' + port + endpoint;
            console.log('sending request to ' + path);
            const req = http.request({
                // host: 'http://localhost',
                port,
                path,
                method
            }, (res) => {
                console.log('received response');
                res.on('data', async (chunk) => {
                    // console.log('received data: ' + chunk);
                    resolve(JSON.parse(chunk), res);
                })
                res.on('end', () => {
                    // if(res.statusCode === 200) {
                        // resolve(true);
                    // }
                    // console.log('no more data in response');
                })
            })

            req.on('error', (e) => {
                reject(e);
            });

            if(data) {
                req.write(JSON.stringify(data));
            }

            req.end();
        })
    }

    connect = async () => {
        console.log('connecting');
        socket = io('http://localhost:8000');
        socket.on('connect', (socket) => {
            console.log('connected');
            this.onConnect();
        });
        socket.on('message', (messageStr) => {
            // console.log('received message: ', messageStr);
            const message = Message.parse(messageStr);
            this.onMessage(message);
        });
        
        return 'ok';
    }

    send = async (message) => {
        console.log('sending message: ', message);
        socket.emit('message', message.toString());
    }

    readSharedFolder = () => {
        return fs.readdirSync('./shared');
    }

    onReceiveFilesList = (list) => {
        console.log(list);
    }
}

module.exports = NodeClient;