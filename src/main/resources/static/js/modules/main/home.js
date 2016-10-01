define(function(require,exports,module){
	
	var Logitch = require("../logitch/logitch");
	var MessageFrame = require("../message-frame/message-frame");
	var Notification = require("../window-notification/window-notification");
<<<<<<< Updated upstream
	var ChatEditor = require("../chat-editor/chat-editor");
	
	
	var messageFrame = new MessageFrame();
	var notification = new Notification();
	var chatEditor = new ChatEditor();
=======
	var PromptMusic = require("../prompt/prompt-music");
	
	var messageFrame = new MessageFrame();
	var notification = new Notification();
	var protmptMusic = new PromptMusic();
>>>>>>> Stashed changes
	
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
        
    };  
  
    //接收到消息的回调方法  
    websocket.onmessage = function (event) {  
    		var message = eval("("+event.data+")");
    		var  auto = isChartContentAutoToBottom();
        setMessageInnerHTML(messageFrame.html(message.content,message.sender,message.type,message.from));
       //当处于底部时自动滚动
        if(auto){
        		scrollChartContentBottom();
        }
        
        if(isWindowMin()){//窗口最小化则在桌面弹出
        		console.log("最小化啦");
        		notification.alert("easychart 【新消息】",message.sender+"发来："+message.content);
        		protmptMusic.sound();
        }
    };  
  
    //连接关闭的回调方法  
    websocket.onclose = function (e) { 
    	console.log(e);
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
<<<<<<< Updated upstream
 
    $(".chat-editor").on("keypress",function(e){
    	if(e.keyCode == 13){
    		var message =$(this).html();  
    		if(message != ""){
    			setMessageInnerHTML(messageFrame.html(message,"我",1,"me"));
    			websocket.send(message);
    		}
            $(this).empty();
            e.preventDefault();
    	}
=======
	
    
    $(".chart-input").on("keypress",function(e){
	    	if(e.keyCode == 13){
	    		var message =$(".chart-input").val();
	    		if(message != ""){
	    			setMessageInnerHTML(messageFrame.html(message,"我",1,"me"));
	    			websocket.send(message);
	    			$(".chart-input").val("");
	    			scrollChartContentBottom();
	    		}
	    	}
>>>>>>> Stashed changes
    });
    
    function isWindowMin() {//窗口是否最小化
		var isMin = false;
		if (window.outerWidth != undefined) {
			isMin = window.outerWidth <= 10 && window.outerHeight <= 10;
		}else {
			isMin = window.screenTop < -30000 && window.screenLeft < -30000;
		}
		return isMin;
	}
<<<<<<< Updated upstream
    
    $(".send-setting li").each(function(){
    	
    });
=======
    function scrollChartContentBottom(){
	 	var div = document.getElementById("chart-content");
	 	
	    div.scrollTop = div.scrollHeight;
	}

>>>>>>> Stashed changes
});