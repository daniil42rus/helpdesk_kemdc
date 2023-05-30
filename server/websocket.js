import WebSocket, { WebSocketServer } from 'ws';
import { local } from './utils/axios.js';

const wss = new WebSocketServer(
  {
    port: 5001,
  },
  () => console.log(`Server started on 5001`)
);

wss.on('connection', function connection(ws) {
  ws.on('message', function (message) {
    message = JSON.parse(message);
    console.log(message);
    applicationsUpdate();

    //   switch (message.event) {
    //     case 'administrators':
    //       administratorsUpdate();
    //       break;
    //     case 'applications':
    //       applicationsUpdate();
    //       break;
    //     case 'client':
    //       customersUpdate();
    //       break;
    //     default:
    //       break;
    //   }
  });
});

async function applicationsUpdate() {
  const getData = await local.get('/applications/');
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(getData.data));
  });
}

// async function administratorsUpdate() {
//   const getData = await local.get('/administrators/');
//   wss.clients.forEach((client) => {
//     client.send(JSON.stringify(getData.data));
//   });
// }
// async function clientUpdate() {
//   const getData = await local.get('/client/');
//   wss.clients.forEach((client) => {
//     client.send(JSON.stringify(getData.data));
//   });
// }
