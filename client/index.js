import grpc from 'grpc';
import readline from 'readline';
import path from 'path';
import { argv, mlog } from 'libs/utils';

const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync(path.join('proto', 'myIRC.proto'), {
  keepCase: true,
  longs: String,
  enums: String,
});

const proto = grpc.loadPackageDefinition(packageDef).myIRC;
const port = parseInt(argv[0], 10) || process.env.PORT;

const client = new proto.IrcService(`localhost:${port}`, grpc.credentials.createInsecure());

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

client.signUp({}, () => {});
client.signIn({}, () => {});
client.profile({}, () => {});
client.join({}, () => {});
client.send({}, () => {});
client.leave({}, () => {});
client.list({}, () => {});
client.history({}, () => {});


console.log(process.env.PORT);

