const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');

const index_page = fs.readFileSync('./list2_15.ejs','utf8');

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');

function getFromClient(request , response){
    var url_parts = url.parse(request.url, true);
    switch (url_parts.pathname){

        case '/':
            var content = "これはIndexページです。"
            var query = url_parts.query;
            if (query.msg != undefined){
                content += 'あなたは、「'+ query.msg +'」と送りました。';
            }
            var content = ejs.render(index_page,{
                title: "Index",
                content: content,
            });
            response.writeHead(200,{'Content-Type': 'text/html'});
            response.write(content);
            response.end();
            break;

        default:
            response.writeHead(200,{'Content-Type': 'text/plain'});
            response.end('no page...');
            break;


    }
}