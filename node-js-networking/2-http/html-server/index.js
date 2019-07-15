const path = require('path');
const fs = require('fs');
const http = require('http');

const server = http.createServer();

server.on('request', (request, response) => {
  const readStream = fs.createReadStream(path.join(__dirname, 'index.html'));
  readStream.pipe(response);
});

server.listen(8080);