define(function(require,exports,module){
	
	var CONF = require("./logitch.conf.js");
	
	var _log = window.console.log;
	var _console = {
			log:_log
	};
	
	console.level = CONF.level;
	console.isClose = CONF.isClose;
	
	console.log = function(str){
		if(this.isClose){
			return;
		}
		
		if(this.level == "info"){
			if(arguments.length == 1){
				try{
				   _console.log.call(window,str);
				}catch(err){
					if(!console.caughtError){
						console.error("错误：浏览器不支持logitch");
						console.caughtError = true;
					}
				}
			}else{
				var param = "";
				for(var i = 0; i < arguments.length; i++){
					 param += ("arguments["+i+"]");
					 if(i != arguments.length-1){
						 param+=",";
					 }
				}
				eval("try{  _console.log.call(window,"+param+")}catch(err){" +
						"if(!console.caughtError){console.error(\"错误：浏览器不支持logitch\");console.caughtError = true;} }");
			}
			 
		}
	};

	function Logitch(){
		
	};
	
	module.exports = Logitch;
	
	//改变当前window的日志输出级别
	Logitch.prototype.level = function(level){
		console.level = level;
	};
	
	
	
	//获取logitch 所在的上下文（模块）的日志输出级别
	Logitch.prototype.getScopeConsole = function(level){
		
		
		return  { log:console.log, level:level,isClose:console.isClose};
	}
	
	
	
});