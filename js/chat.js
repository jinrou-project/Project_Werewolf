

    var myName;
    // 音楽ファイル再生のためのオブジェクトの初期化
    var addSound = new Audio();
    // 音楽ファイルの設定
    addSound.src = 'se/se01.wav';

    var chatFlg = false ;
    
    //入室ボタンを押したときの処理　
    $('#entry').click(function(){
        addSound.play();
        entry();
    });


    //エンターキーをおした時の操作
    $('#nameInput').keypress(function(e){
        if(e.keyCode == 13){
            addSound.play();
            entry();
        }
    });


    //話すボタンをクリックした時の処理
    $(document).on('click', '#enterMsg', function(){
        publishMessage();
    });

    //メッセージのテキストボックスでエンターキーを押したときの処理
    $(document).on('keypress', '#msgInput', function(e){
        if(e.keyCode == 13){
            publishMessage();
        }
    });

    //入室時の処理
    function entry(){

        chatFlg = true ;

        myName = $('#nameInput').val();
        var domForm = $('#formArea').get(0);

        //input要素生成
        var input = $('<input autofocus>');
        input.attr('id', 'msgInput');

        //button要素生成
        var button = $('<button>');
        button.attr('id', 'enterMsg');
        button.html("話す");

        //formAreaに生成した要素を追加
        $('#formArea').append(input).append(button);

        login(myName);

        var lf = $('#loginForm').get(0);
        //名前入力欄削除
        while(lf.firstChild){
            lf.removeChild(lf.firstChild);
        }

        var nameArea = $('#nameArea').get(0);
        var domName = $('<p>').get(0);
        domName.innerHTML = 'ようこそ' + myName + 'さん';
        nameArea.appendChild(domName);
        socketio.emit("line",null);
    }


    // 1.イベントとコールバックの定義
    var socketio = io.connect(location.href);
    var num;
    socketio.on("line", function(data){
        data.forEach(addMessage);
    });

    socketio.on("connected", function(name) {});
    socketio.on("publish", function (data) { addMessage(data.value); });
    socketio.on("disconnect", function () {});
    socketio.on("connNum", function (data) {
        console.log(data);
        num = data.toString();
        $('num').innerHTML = num;
    });

    // 2.イベントに絡ませる関数の定義
    function start(name) {
        socketio.emit("connected", name);
    }

    function publishMessage() {
        var textInput = $('#msgInput').get(0);
        var msg = "[" + myName + "] " + textInput.value;
        socketio.emit("publish", {value: msg});
        textInput.value = '';
    }

    function addMessage (msg) {
        if(chatFlg){
            var msgArea = $('#msg').get(0);
            var domMsg = $('<div>').get(0);
            domMsg.innerHTML = new Date().toLocaleTimeString() + ' ' + msg;
            domMsg.style.background = 'red';
            setTimeout(function(){
                domMsg.style.background = 'none';
            },5000);
            msgArea.insertBefore(domMsg,msgArea.firstChild);            
        }
    }

    // 3.開始処理
    function login(name){
        var myName = name + "さん";
        start(myName);
    }

