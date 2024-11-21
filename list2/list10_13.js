const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url =　require('url');

const index_page = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');

function getFromClient(request , respopnse){
	var url_parts = url.parse(request.url);
	switch (url_parts.pathname){
		
		case '/':
		var content = ejs.render(index_page,{
			title: "Index",
			content: "this is sample page of use template",
		});
		response.whiteHead(200, {'Content-Type': 'text/html'});
		response.white(content);
		response.end();
		break;
		
		case '/style.css':
		response.writeHead(200, {'Content-Type': 'text/css'});
		response.Write(style_css);
		response.end();
		break;
		
		default:
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.end('no page...');
		break;
		
	}
}