//webサーバ
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
http.listen(3000,function(){
    console.log('listen 3000 port');
});

app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/css/'));
app.get('/',function(req,res){
    res.sendfile('index.html');
});


