const port = 8000;
let deviceName = 'unnamed device';

// const request = (path, data = null, method = 'GET') => {};
// const onMessage = (message) => {};

const extend = (connectFn, requestFn) => {
    request = requestFn;
}

const list = async () => {
    return await request('/list');
}

const ping = async () => {
    console.log('pinging');
    return await request('/ping');
}

const view = async (name) => {
    return await request('/view?name=' + name);
}

const setName = (name) => {
    deviceName = name;
}

const connect = (name) => {};

const listFiles = async (device, path) => {

}

const files = async (command, ...args) => {
    if(command === 'list') {
        return await listFiles(...args);
    }
}

module.exports = {
    list,
    ping,
    setName,
    connect,
    view,
    files,
    extend
}