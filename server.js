function server(){
	// モジュール読み込み
	var express = require('express');
	var app = express();
	var http = require('http').Server(app);
	var io = require('socket.io')(http);
	http.listen(8080,function(){
	    console.log('listen 8080 port');
	});
	//ルーティング
	app.use(express.static(__dirname + '/'));
	app.use(express.static(__dirname + '/css/'));
}
module.exports = {
	server: server
}