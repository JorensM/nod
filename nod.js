const server = require('./lib/server');
const client = require('./lib/nodeClient');

const mode = process.argv[2];
const command = process.argv[3];
const commandArg = process.argv[4];

if(mode === 'server') {
    server.start();
} else {
    (async () => {
        await client.connect('client1');
        console.log('running command ' + command);
        const res = await client[command](commandArg);//.then((res) => {
        console.log(res);
        //     // console.log('command resolved');
        //     console.log(res);
        // });

    })();
}