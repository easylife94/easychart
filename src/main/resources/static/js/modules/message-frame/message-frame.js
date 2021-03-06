define(function(require,exports,module){
	
	var MessageFrame = function(){
		
	};
	MessageFrame.whose = {
			my:1,
			other:2
	}
	MessageFrame.type = {
			text:1,
			image:2,
	}
	module.exports = MessageFrame;
	
	MessageFrame.prototype.html = function(message,sender,type,from){
		var html = "<div><div class=\"message-frame\"><div class=\"message-frame-sender\"></div><div class=\"message-frame-content\"></div></div><div>";
		var _JOM = $(html);//jquery object model
		
		if(from == "sys"){
			var messageHtml = "";
			sender = "系统：";
			if(message.type == 1){
				messageHtml = "<span>"+sender+message.content.user+" 加入聊天</span>"
			}else if(message.type == 2){
				messageHtml = "<span>"+sender+message.content.user+" 离开聊天</span>";
			}
			
			_JOM.find(".message-frame").removeClass("message-frame").addClass("sys-message-frame");		
			_JOM.find(".sys-message-frame").html(messageHtml);
			$(".user-num .num").text(message.content.total);
			return _JOM.html();
		}
			
		_JOM.find(".message-frame-sender").html(sender==null||sender==""?"游客":sender);				
		
		if(type!=null && typeof type == "number"){
			switch(type){
			case MessageFrame.type.text:
				text(_JOM,message);
				break;
			case MessageFrame.type.image:
				break;
			default:
				text(_JOM,message);
				break;
			}
		}else{
			text(_JOM,message);
		}
		
		if(from == "me"){
			_JOM.find(".message-frame-sender").addClass("fr");//fr  float:right
			_JOM.find(".message-frame-content").addClass("fr");
		}
		return _JOM.html();
	}
	
	function text(_JOM,message){
		_JOM.find(".message-frame-content").html(message);
	}
	
	function image(_JOM,messgae){
		
	}
	
})