define(function(require,exports,module){
	var ChatContent = function(container){
		var _this = this;
		this.status = "unfocus";
		this.content = container;
		//div 默认无focus 和 blur事件，需要在标签添加 tabindex="1" 属性
		this.content.focus(function(e){
			_this.status = "focus";
		});
		this.content.blur(function(e){
			_this.status = "unfocus";
		})
		
		
	}
	module.exports = ChatContent;
	
	//滚动到底部
	ChatContent.prototype.toBottom = function(){
		this.content[0].scrollTop = this.content[0].scrollHeight;
	}
});