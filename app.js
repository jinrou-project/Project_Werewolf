// モジュール読み込み
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
http.listen(8080,function(){
    console.log('listen 8080 port');
});


// ユーザ管理ハッシュ
var userHash = {};
//接続数のカウンタ
var counter = 0;

//ルーティング
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/css/'));

// イベントの定義
io.sockets.on("connection", function (socket) {
  counter++;
  console.log("connect:" + counter);


  // 接続開始カスタムイベント(接続元ユーザを保存し、他ユーザへ通知)
  socket.on("connected", function (name) {
    var msg = name + "が入室しました";
    userHash[socket.id] = name;
    io.sockets.emit("publish", {value: msg});
  });

  // メッセージ送信カスタムイベント
  socket.on("publish", function (data) {
    io.sockets.emit("publish", {value:data.value});
  });

  // 接続終了組み込みイベント(接続元ユーザを削除し、他ユーザへ通知)
  socket.on("disconnect", function () {
    if (userHash[socket.id]) {
      var msg = userHash[socket.id] + "が退出しました";
      delete userHash[socket.id];
      io.sockets.emit("publish", {value: msg});
    }
    counter--;
    console.log("connect:" + counter);
  });
});
