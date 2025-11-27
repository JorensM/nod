import NodeServer from './lib/NodeServer.js';
import NodeClient from './lib/nodeClient.js';

//const server = require('./lib/server');
//const NodeClient = require('./lib/nodeClient');

const mode = process.argv[2];
const command = process.argv[3];
const commandArgs = process.argv.slice(4);//[4];

if(mode === 'server') {
    const server = new NodeServer({
        sharedFolders: [ {fullPath: 'C:\\Users\\joren\\Desktop\\notes', name: 'notes'} ]
    });
    server.start();
} else {
    const client = new NodeClient();
    client.onConnect = async () => {
        console.log('running command ' + command);
        const res = await client[command](...commandArgs);//.then((res) => {
        console.log(res);
    }
    client.connect('client1');
}