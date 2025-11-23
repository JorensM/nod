

const Message = require('./Message');

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
    port = 8000;

    request = (path, data = null, method = 'GET') => {};
    send = (message) => {};
    connect = (name) => {};
    onConnect = () => {};
    readSharedFolder = () => {};
    onReceiveFilesList = () => {};

    list = async () => {
        return await this.request('/list');
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
    }

    listFiles = async (device, path) => {
        this.send(new Message(this.deviceName, device, 'files/list', { path }));
    }

    files = async (command, ...args) => {
        console.log(...args);
        if(command === 'list') {
            console.log('listing files');
            return await this.listFiles(...args);
        }
    }

    onMessage = (message) => {
        if(message.to !== this.deviceName) {
            return;
        }
        console.log('received message: ', message);
        if(message.type === 'files/list') {
            const sharedFolder = this.readSharedFolder();
            this.send(new Message(this.deviceName, message.from, 'files/list:', sharedFolder))
            // console.log('received files ')
        } else if (message.type === 'files/list:') {
            this.onReceiveFilesList(message.data);
        }
    };
}


module.exports = BaseClient;