var http = require('http');
var fs = require('fs');
var ejs = require('ejs');
 
var hello = fs.readFileSync('./hello.ejs', 'utf8');
 
var server = http.createServer();
server.on('request', doRequest);
server.listen(1234);
console.log('Server running!');
 
// リクエストの処理
function doRequest(req, res) {
    var hello2 = ejs.render(hello, {
        title:"タイトルです",
        content:"これはサンプルで作成したテンプレートです。",
    });
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(hello2);
    res.end();
}