const { addAbortListener } = require('events');
const http = require('http');

var server = http.createServer(
	(request,respose)=>{
		respose.end('<html><body><h1>Hello</h1><p>Welcome to Node.js</p></body></html>');
	}
);

server.listen(3000);