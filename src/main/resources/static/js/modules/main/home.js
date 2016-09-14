define(function(require,exports,module){
	
	var Logitch = require("../logitch/logitch");
	var MessageFrame = require("../message-frame/message-frame");
	
	var messageFrame = new MessageFrame();
	var chartSocketUrl = "ws://"+window.location.host+"/ws/chart";
	
	//判断当前浏览器是否支持WebSocket  
    if ('WebSocket' in window) {  
        websocket = new WebSocket(chartSocketUrl);  
    }  
    else {  
        alert('Not support websocket');  
    }  
  
    //连接发生错误的回调方法  
    websocket.onerror = function () {  
        setMessageInnerHTML("error");  
    };  
  
    //连接成功建立的回调方法  
    websocket.onopen = function (event) {  
        setMessageInnerHTML("open");
        
    }  
  
    //接收到消息的回调方法  
    websocket.onmessage = function (event) {  
    	var message = eval("("+event.data+")");
    	console.log(message);
        setMessageInnerHTML(messageFrame.html(message.content,message.sender,message.type,message.from));
    }  
  
    //连接关闭的回调方法  
    websocket.onclose = function () {  
        setMessageInnerHTML("close");  
    }  
  
    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。  
    window.onbeforeunload = function () {  
        websocket.close();  
    }  
  
    //将消息显示在网页上  
    function setMessageInnerHTML(innerHTML) {
    	$(innerHTML).appendTo($(".chart-content"));
    }  
  
    //关闭连接  
    function closeWebSocket() {  
        websocket.close();  
    }  
  
    //发送消息  
    function send() {  
        var message =$(".chart-input").val();  
        websocket.send(message);
        setMessageInnerHTML(messageFrame.html(message,"我",1,"me"));
    }  
	
    $(".chart-input").on("keypress",function(e){
    	if(e.keyCode == 13){
    		var message =$(".chart-input").val();  
    		setMessageInnerHTML(messageFrame.html(message,"我",1,"me"));
            websocket.send(message);
            $(".chart-input").val("");
    	}
    });
    
    
});