const server = require('./lib/server');
const client = require('./lib/client');

const mode = process.argv[2];
const command = process.argv[3];
const commandArg = process.argv[4];

if(mode === 'server') {
    server.start();
} else {
    // console.log('running command ' + command);
    client[command](commandArg).then((res) => {
        // console.log('command resolved');
        console.log(res);
    });
}