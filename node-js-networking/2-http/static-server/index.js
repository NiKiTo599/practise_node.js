const fs = require('fs');
const path = require('path');
const http = require('http');

const { createDirTemplates } = require('./helpers');

const server = http.createServer();

server.on('request', (request, response) => {
  const requestUrl = path.join(__dirname, request.url);

  fs.stat(requestUrl, (err, stats) => {
    if (!stats) {
      response.end(`${request.url} does not exists`);
    } else if (!stats.isDirectory()) {
      const readable = fs.createReadStream(requestUrl);
      readable.pipe(response);
    } else {
      fs.readdir(requestUrl, (err, dir) => {
        response.end(createDirTemplates(dir, requestUrl));
      });
    }
  });
});

server.listen(8080);