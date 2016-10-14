define(function(require,exports,module){
	
	var Logitch = require("../logitch/logitch");
	var MessageFrame = require("../message-frame/message-frame");
	var Notification = require("../window-notification/window-notification");
	var ChatEditor = require("../chat-editor/chat-editor");
	var PromptMusic = require("../prompt/prompt-music.js");
	
	var send_setting = "enter";
	var messageFrame = new MessageFrame();
	var notification = new Notification();
	var chatEditor = new ChatEditor();
	var promptMusic = new PromptMusic();
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
        setMessageInnerHTML(messageFrame.html(message.content,message.sender,message.type,message.from));
        promptMusic.sound();
        if(isWindowMin()){//窗口最小化则在桌面弹出
        	  notification.alert("easychart 【新消息】",message.sender+"发来："+message.content);
        }
    };  
  
    //连接关闭的回调方法  
    websocket.onclose = function (e) { 
    	console.log(e);
        setMessageInnerHTML("close");  
    }; 
  
    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。  
    window.onbeforeunload = function () {  
        websocket.close();  
    };  
  
    //将消息显示在网页上  
    function setMessageInnerHTML(innerHTML) {
    	$(innerHTML).appendTo($(".chart-content"));
    }  
  
    //关闭连接  
    function closeWebSocket() {  
        websocket.close();  
    }  
 
    $(".chat-editor").on("keypress",function(e){
    	
    	console.log(e);
    	if(send_setting == "enter" &&  e.keyCode == 13 ){
    		send();
    		e.preventDefault();
    	}else if(send_setting == "ctrlenter" && e.ctrlKey && e.keyCode  == 10){
    		send();
    		e.preventDefault();
    	}
    	 
    });
    $("#send-btn").click(function(){
    	if(chatEditor.status != "no_context"){
    		send();
    	}
    });
    //发送消息
    function send(){
    	var editor =  $(".chat-editor");
    	var message = editor.html();  
    	var messageHtml = "";
    	
		if(message != ""){
			websocket.send(message);
			if(!$("#reciever-switch").is(':checked')){
				messageHtml = "<a href='javascript:void(0);' style='color:#F1C40F;'>@bot</a> " + message;							
				message = "@bot "+message;
			}else{
				messageHtml = message;
			}
			websocket.send(message);
			setMessageInnerHTML(messageFrame.html(messageHtml,"我",1,"me"));
			editor.empty();
		}
    }
    
    function isWindowMin() {//窗口是否最小化
		var isMin = false;
		if (window.outerWidth != undefined) {
			isMin = window.outerWidth <= 160 && window.outerHeight <= 27;
		}else {
			isMin = window.screenTop < -30000 && window.screenLeft < -30000;
		}
		return isMin;
	}
    
    //发送快捷键设置
    $(".send-setting li").each(function(){
    	$(this).click(function(){
    		$(".send-setting li").each(function(){
   			   $(this).removeClass("active");
   		 	});
    		 $(this).addClass("active");
    		
    		send_setting = $(this).find("a").attr("data-setting");
    		console.log("设置发送快捷键：%s",send_setting);
    		
    	});
    });
});