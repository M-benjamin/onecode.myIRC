import grpc from 'grpc';
import { argv, mlog } from 'libs/utils';
import path from 'path';
import signIn from './rpc/sign_in';
import signUp from './rpc/sign_up';
import profile from './rpc/profile';
import join from './rpc/join';
import send from './rpc/send';
import leave from './rpc/leave';
import list from './rpc/list';
import history from './rpc/history';

const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync(path.join('proto', 'myIRC.proto'), {
  keepCase: true,
  longs: String,
  enums: String,
});

const proto = grpc.loadPackageDefinition(packageDef).myIRC;

const server = new grpc.Server();

const port = parseInt(argv[0], 10) || process.env.PORT;

server.addService(proto.IrcService.service, {
  signUp,
  signIn,
  profile,
  join,
  send,
  leave,
  list,
  history,
});

server.bind(`localhost:${port}`, grpc.ServerCredentials.createInsecure());
server.start();

mlog(`Server is running on port: ${port}`);
