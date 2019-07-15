const http = require('http');

const users = [
  { name: 'John', age: 23},
  { name: 'Nikita', age: 45},
];

const cities = [
  { name: 'Minsk', age: 1200},
  { name: 'Moskow', age: 9999},
];

const server = http.createServer();

server.on('request', (request, response) => {
  switch(request.url) {
    case '/users':
      response.writeHead(200, {
        'Content-Type': 'aplication/json'
      });
      response.end(JSON.stringify(users));
      break;
      case '/cities':
      response.writeHead(200, {
        'Content-Type': 'aplication/json'
      });
      response.end(JSON.stringify(cities));
      break;
      default:
          response.writeHead(404, {
            'Content-Type': 'text/plain'
          });
          response.end(`${request.url} not suported`);
  }
});

server.listen(8080);