const net = require('net');

const server = net.createServer();

server.on('connection', (socket) => {
  socket.on( 
    'data', 
    data => console.log('request ', data.toString())
  );

  socket.end(`HTTP/1.1 200 OK
  
<h1>Hello</h1>`);
});

server.listen(8080, () => console.log('listening...'));