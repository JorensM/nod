const http = require('node:http');

const port = 8000;
let deviceName = 'unnamed device';

const request = (path, data = null, method = 'GET') => {
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

const list = async () => {
    return await request('/list');
}

const ping = async () => {
    console.log('pinging');
    return await request('/ping');
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

module.exports = {
    list,
    ping,
    setName,
    connect
}