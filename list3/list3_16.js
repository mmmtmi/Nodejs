//app.js
const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./list3_15.ejs','utf8');
const other_page = fs.readFileSync('./list3_12.ejs','utf8');

var data = {
    msg: 'no message...'
};
var data2 = {
    'Taro': ['taro@yamada','09-999-999','Tokyo'],
    'Hanako':['hanako@flower','080-888-888','Yokohama'],
    'Sachiko':['sashi@happy','070-777-777','Nagoya'],
    'Ichiro':['ichi@baseball','060-666-666','USA'],
}

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server start!');

function getFromClient(request , response){
    var url_parts = url.parse(request.url, true);
    switch (url_parts.pathname){

        case '/':
            response_index(request,response);
            break;
        case '/other':
            response_other(request,response);
            break;

        default:
            response.writeHead(200,{'Content-Type': 'text/plain'});
            response.end('no page...');
            break;


    }
}

function response_index(request , response){
    
    if(request.method == 'POST'){
        var body = '';

        request.on('data', (data) =>{
            body += data;
        });

        request.on('end',()=>{
            data= qs.parse(body);
            setCookie('msg', data.msg, response);
            write_index(request, response);
        });
    }else{
        write_index(request , response);
    }
    }
    
function write_index(request , response){
    var msg = "※伝言を表示します。"
    var cookie_data = getCookie('msg' , request);
    var content = ejs.render(index_page,{
        title: "Index",
        content: msg,
        data: data,
        cookie_data: cookie_data,
    });
    response.writeHead(200,{'Content-Type': 'text/html'});
    response.write(content);
    response.end();
}

function setCookie(key, value, response){
    var cookie = escape(value);
    response.setHeader('Set-Cookie', [key + '=' + cookie]);
}

function getCookie(key, request){
    var cookie_data = request.headers.cookie != undefined?
    request.headers.cookie : '';
    var data = cookie_data.split(';');
    for (var i in data){
        if(data[i].trim().startsWith(key+ '=')){
            var result = data[i].trim().substring(key.length + 1);
            return unescape(result);
        }
    }
    return '';
}


function response_other(request , response){
    var msg = "これはOtherページです。"
    var content = ejs.render(other_page,{
                title: "Other",
                content: msg,
                data: data2,
                filename: 'list3_9'
    });
            response.writeHead(200,{'Content-Type': 'text/html'});
            response.write(content);
            response.end();
    
    
}