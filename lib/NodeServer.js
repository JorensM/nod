import http from 'node:http';
import os from 'node:os';
import NodeClient from './nodeClient.js';
import { Server } from 'socket.io';
import Message from './Message.js';
import BaseServer from "./BaseServer.js";

class NodeServer extends BaseServer {

    constructor(config) {
        super();
        // this.config = config;
        
        this.client = new NodeClient(config);
    }
    
    callEndpoint(path, url, res, data = null) {
        return new Promise((resolve) => {
            this.endpoints[path]({ data }, res, url).then((response) => {
                // console.log('resolved: ', status);
                resolve(response);
            });
        })
        // const data = JSON.parse(chunk);
    }

    start = () => {
        const networkInterfaces = os.networkInterfaces();
        console.log(networkInterfaces);
        const host = os.networkInterfaces()['Wi-Fi'][1].address;
        console.log(host);
        const server = http.createServer({ host }, async (req, res) => {
            // console.log(req.headers);
            // console.log(os.networkInterfaces());
            const origin = req.headers?.origin && new URL(req.headers.origin).hostname;
            console.log(origin);
            if(origin && ['localhost', '127.0.0.1', host].includes(origin)) {
                res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
            }
            console.log('request received: ', req.url);
            const url = new URL('http://localhost:' + this.port + req.url);
            const endpoint = url.pathname;
            
            if(this.endpoints[endpoint]) {
                if(req.method === 'GET') {
                    const response = await this.callEndpoint(endpoint, url, res);
                    // console.log('response: ', response);
                    if(response.status === 200) {
                        res.write(JSON.stringify(response));
                    }
                    if(response.status) {
                        // console.log('response had status: ', response.status);
                        res.statusCode = response.status;
                    }
                    res.end();
                } else if (req.method === 'POST') {
                    req.on('data', async (chunk) => {
                        const data = JSON.parse(chunk);
                        const response = await this.callEndpoint(endpoint, url, res, data);

                        res.write(JSON.stringify(response));
                        if(response.status) {
                            res.statusCode = response.status;
                        }
                        res.end();
                    });
                }
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
            // devices.push(socket.id);
        });

        server.listen(this.port, null, null, () => {
            console.log('nod server listening on 8000');
        });

        this.client.setName('server');
        this.client.connect();
        this.client.register();
    }
};

export default NodeServer;