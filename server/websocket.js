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

    switch (message.event) {
      case 'executors':
        executorsUpdate();
        break;
      case 'applications':
        applicationsUpdate();
        break;
      default:
        break;
    }

  });
});

async function applicationsUpdate() {
  const getExecutors = await axios.get('http://localhost:3004/applications');
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(getExecutors.data));
  });
}

async function executorsUpdate() {
  const getExecutors = await axios.get('http://localhost:3004/executors');
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(getExecutors.data));
  });
}