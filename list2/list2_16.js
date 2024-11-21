const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');


const index_page = fs.readFileSync('./list2_15.ejs','utf8');
const style_css = fs.readFileSync('./list2_11.css','utf8');
const other_page = fs.readFileSync('./list2_14.ejs','utf8');

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');

function getFromClient(request , response){
	var url_parts = url.parse(request.url);
	switch (url_parts.pathname){
		
		case '/':
		var content = ejs.render(index_page,{
			title: "Index",
			content: "this is sample page of use template",
		});
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write(content);
		response.end();
		break;

        case '/list2_14.ejs':
            var content = ejs.render(other_page,{
                title: "Other",
                content:"これは新しく用意したページです",
            });
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(content);
            response.end();
            break;
		

		default:
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.end('no page...');
		break;
		
	}
}