define(function(require,exports,module){
	
	var Notification = window.Notification || window.mozNotification || window.webkitNotification;  
	
	 if(Notification) {//支持桌面通知  
		 Notification.requestPermission(function(status) {});  
	 }else{//不支持(IE等) 
		 
	 }
	
	var WindowNotification = function(){
		
		
		
		
	};
	
	module.exports = WindowNotification;
	
	WindowNotification.prototype.alert = function(title,msg){
         if(Notification) {//支持桌面通知  
             if(Notification.permission == "granted") {//已经允许通知  
                 var instance = new Notification(title, {  
                     body: msg,  
                 });  

                 instance.onclick = function() {  
                     instance.close();  
                 };  
                 instance.onerror = function() {  
                     console.log('onerror');  
                 };  
                 instance.onshow = function() {  
                     console.log('onshow');  
                 };  
                 instance.onclose = function() {  
                     console.log('onclose');  
                 };  
             }else {//第一次询问或已经禁止通知(如果用户之前已经禁止显示通知，那么浏览器不会再次询问用户的意见，Notification.requestPermission()方法无效)  
                 Notification.requestPermission(function(status) {  
                     if (status === "granted") {//用户允许  
                         var instance = new Notification(title, {  
                             body: msg,  
                         });  

                         instance.onclick = function() {  
                             // Something to do  
                         };  
                         instance.onerror = function() {  
                             // Something to do  
                         };  
                         instance.onshow = function() {  
                             // Something to do  
                         };  
                         instance.onclose = function() {  
                             // Something to do  
                         };  
                     }else {//用户禁止  
                         return false;  
                     }  
                 });  
             }  
         }else {//不支持(IE等)  
             var index = 0;      
             clearInterval(timer);  
             timer = setInterval(function() {  
                 if(index%2) {  
                     $('title').text('【　　　】'+ title);//这里是中文全角空格，其他不行  
                 }else {  
                     $('title').text('【新消息】'+ title);  
                 }  
                 index++;  

                 if(index > 20) {  
                     clearInterval(timer);  
                 }  
             }, 500);  
         }  
	}
	
});