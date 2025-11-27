import Message from "./Message.js";

// let request = (path, data = null, method = 'GET') => {};
// let send = (message) => {};
// let connect = (name) => {};

// const extend = (connectFn, requestFn, sendFn) => {
//     request = requestFn;
//     connect = connectFn;
//     send = sendFn;
// }



class BaseClient {

    deviceName = 'unnamed device';
    name = this.deviceName;
    port = 8000;

    config = {
        sharedFolders: [{
            fullPath: './shared',
            name: 'shared'
        }]
    }

    constructor(config) {
        if(config?.sharedFolders) {
            this.config.sharedFolders = this.config.sharedFolders.concat(config.sharedFolders);
        }
    }

    request = (path, data = null, method = 'GET') => {};
    /**
     * 
     * @param { Message } message 
     */
    send = (message) => {};
    connect = (name, hostname = 'localhost') => {};
    onConnect = () => {};
    readSharedFolder = () => {};
    onReceiveFilesList = (data) => {};

    list = async () => {
        return await this.request('/list');
    }

    devices = async (name = null) => {
        return await this.request('/devices' + (name ? ('?name=' + name) : ''));
    }

    ping = async () => {
        console.log('pinging');
        return await this.request('/ping');
    }

    view = async (name) => {
        return await this.request('/view?name=' + name);
    }

    setName = (name) => {
        this.deviceName = name;
        this.name = name;
        return {
            message: 'Renamed device to ' + name
        }
    }

    listFiles = async (device, path) => {
        if(!device) {
            return {
                message: 'Device not specified'
            }
        }
        this.send(new Message(this.deviceName, device, 'files/list', { path }));
        return {
            message: 'Retrieving files'
        }
    }

    files = async (command, ...args) => {
        console.log(...args);
        if(command === 'list') {
            console.log('listing files');
            return await this.listFiles(...args);
        }
    }

    async register() {
        const res = await this.request('/register', this.serializeInstance(), 'POST');
        return res;
    }

    serializeInstance() {
        return {
            name: this.deviceName
        }
    }

    onMessage = (message) => {
        if(message.to !== this.deviceName) {
            return;
        }
        console.log('received message: ', message);
        if(message.type === 'error') {
            this.onError(message);
        }
        try {
            if(message.type === 'files/list') {
                const sharedFolder = this.readSharedFolder(message?.data?.path);
                this.send(new Message(this.deviceName, message.from, 'files/list:', sharedFolder))
                // console.log('received files ')
            } else if (message.type === 'files/list:') {
                this.onReceiveFilesList(message.data);
            }
        } catch (e) {
            this.send(new Message(this.deviceName, message.from, 'error', e.toString()));
        }
        
    };
}


export default BaseClient;