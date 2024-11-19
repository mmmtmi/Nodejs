const http = require('http');
const fs = require('fs');

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server Start!');

function getFromClient(req,res){
	request = req;
	response = res;
	fs.readFile('./index','utf-8'),
	(error,data)=>{
		response.writeHead(200,{ 'Content-Type': 'text/htm'});
		response.write(data);
		response.end();
	}
}
