/**
 * logitch的全局配置文件
 */
define(function(required,exports,module){
	function CONF(){};
	module.exports = CONF;
	
	//日志开关
	CONF.isClose = false;
	
	//日志输出级别
	CONF.level = "info";
	//日志输出格式
	CONF.format = "";
	
});