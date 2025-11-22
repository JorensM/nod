const http = require('node:http');

const port = 8000;
let deviceName = 'unnamed device';



const extend = (requestFn) => {
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

const connect = async (name) => {
    if(name) {
        setName(name);
    }
    return await request('/connect', {
        name: deviceName
    }, 'POST')
}

const listFiles = async (device) => {

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