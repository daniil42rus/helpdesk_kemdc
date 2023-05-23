const ws = require('ws');
const axios = require('axios');

const wss = new ws.Server(
  {
    port: 5001,
  },
  () => console.log(`Server started on 5001`)
);

wss.on('connection', function connection(ws) {
  ws.on('message', function (message) {
    message = JSON.parse(message);
    // console.log(message);
    applicationsUpdate();


    // switch (message.event) {
    //   case 'executors':
    //     executorsUpdate();
    //     break;
    //   case 'applications':
    //     applicationsUpdate();
    //     break;
    //   case 'customers':
    //     customersUpdate();
    //     break;
    //   default:
    //     break;
    // }
    
  });
});

async function applicationsUpdate() {
  const getData = await axios.get('http://localhost:3002/api/applications/');
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(getData.data));
  });
}

// async function executorsUpdate() {
//   const getData = await axios.get('http://localhost:3004/executors');
//   wss.clients.forEach((client) => {
//     client.send(JSON.stringify(getData.data));
//   });
// }
// async function customersUpdate() {
//   const getData = await axios.get('http://localhost:3004/customers');
//   wss.clients.forEach((client) => {
//     client.send(JSON.stringify(getData.data));
//   });
// }
