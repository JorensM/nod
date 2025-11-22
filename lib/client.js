const http = require('node:http');

const port = 8000;

const request = (path) => {
    return new Promise((resolve, reject) => {
        // const url = 'http://localhost:' + port + endpoint;
        console.log('sending request to ' + path);
        const req = http.request({
            // host: 'http://localhost',
            port,
            path
        }, (res) => {
            // console.log('received response');
            res.on('data', async (chunk) => {
                // console.log('received data: ' + chunk);
                // resolve(chunk.toString());
            })
            res.on('end', () => {
                if(res.statusCode === 200) {
                    resolve(true);
                }
                // console.log('no more data in response');
            })
        })

        req.on('error', (e) => {
            reject(e);
        })

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

module.exports = {
    list,
    ping
}