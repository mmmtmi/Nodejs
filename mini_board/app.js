const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./index.ejs','utf8');
const login_page = fs.readFileSync('./login.ejs', 'utf8');

const max_num = 10;
const filename = 'mydata.txt';
var message_data;
readFromFile(filename);

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');

function getFromClient(request, response){
    var url_parts = url.parse(request.url, true);
    switch (url_parts.pathname){
        case '/':
            response_index(request, response);
            break;
        
        case '/login':
            response_login(request,response);
            break;
        
        default:
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end('no page...');
            break;
    }
}

function response_login(request, response){
    var content = ejs.render(login_page, {});
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(content);
    response.end();
}

function response_index(request, response){
    if(request.method == 'POST'){
        var body = '';

        request.on('data', function(data){
            body += data;
        });

        request.on('end', function(){
            data = qs.parse(body);
            addToData(data.id, data.msg, filename, request);
            write_index(request, response);
        });
    }else{
        write_index(request, response);
    }
}

function write_index(request, response){
    var msg = "※何かメッセージを書いてください";
    var content = ejs.render(index_page,{
        title: 'Index',
        content: msg,
        data: message_data,
        filename: 'data_item',
        });
        response.writeHead(200,{'Content-Type': 'text/html'});
        response.write(content);
        response.end();
}

function readFromFile(fname){
    fs.readFile(fname, 'utf8', (err,data)=>{
        message_data = data.split('\n');
    })
}

function addToData(id, msg, fname, request){
    var obj = { 'id': id, 'msg': msg };
    var obj_str = JSON.stringify(obj);
    console.log('add data:'+obj_str);
    message_data.unshift(obj_str);
    if(message_data.length > max_num){
        message_data.pop();
    }
    saveToFile(fname);
}

function saveToFile(fname){
    var data_str = message_data.join('\n');
    fs.writeFile(fname, data_str, (err) =>{
        if (err){throw err;}
    });
}