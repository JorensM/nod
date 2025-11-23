

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
        if(command === 'list') {
            return await this.listFiles(...args);
        }
    }

    onMessage = (message) => {
        console.log('received message: ', message);
        if(message.type === 'files/list') {
            // console.log('received files ')
        }
    };
}


module.exports = BaseClient;