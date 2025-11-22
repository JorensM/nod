const server = require('./lib/server');
const client = require('./lib/client');

const mode = process.argv[2];

if(mode === 'server') {
    server.start();
} else {
    client.ping().then((status) => {
        if(status) {
            console.log('pinged server successfully');
        }
    })
}