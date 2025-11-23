import { io, Socket } from 'socket.io-client';
import BaseClient from "./client.js";

class BrowserClient extends BaseClient {

    /**
     * @type { Socket }
     */
    socket;

    request = async (path, data = undefined, method = 'GET') => {
        const res = await fetch('http://localhost:8000' + path, {
            body: data && JSON.stringify(data),
            method
        });

        const resData = await res.json();

        return resData;
    };

    connect = async () => {
        console.log('connecting');
        this.socket = io('http://localhost:8000');
        this.socket.on('connect', (socket) => {
            console.log('connected');
            this.onConnect();
        });
        this.socket.on('message', (messageStr) => {
            // console.log('received message: ', messageStr);
            const message = Message.parse(messageStr);
            this.onMessage(message);
        });
        
        return 'ok';
    }

    send = async (message) => {
        this.socket.send(message.toString());
    }
}

window.nod = new BrowserClient();