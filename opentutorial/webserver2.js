const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

var server = http.createServer(function(request, response){
  request.writeHead(200,{'Content-Type' : 'text/plain'});
  request.end('Hello world\n');
});

server.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});
