import { io, Socket } from 'socket.io-client';
import BaseClient from "./client.js";
import Message from './Message.js';

class BrowserClient extends BaseClient {

    /**
     * @type { Socket }
     */
    socket;

    hostname = 'localhost';

    request = async (path, data = undefined, method = 'GET') => {
        const res = await fetch('http://' + this.hostname + ':8000' + path, {
            body: data && JSON.stringify(data),
            method
        });

        let resData = null;

        if(res.status === 200) {
            resData = await res.json();
        }


        return {
            data: resData?.data,
            message: resData?.message,
            status: res.status
        }
    };

    connect = async (name) => new Promise((resolve) => {
        console.log('connecting');
        this.socket = io('http://' + this.hostname + ':8000');
        
        this.socket.on('connect', (socket) => {
            console.log('connected');
            resolve({
                message: 'Connected to network'
            })
            this.onConnect();
        });
        this.socket.on('message', (messageStr) => {
            // console.log('received message: ', messageStr);
            const message = Message.parse(messageStr);
            this.onMessage(message);
        });
    })

    send = async (message) => {
        this.socket.send(message.toString());
    }

    onReceiveFilesList = async (data) => {
        return await this.onEvent('receiveFilesList', data);
    }

    onEvent = async (type, data) => {};
}

window.nod = new BrowserClient();