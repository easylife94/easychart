define(function(require,exports,module){
	
	var Logitch = require("../logitch/logitch");
	var DragFile = require("./drag-file");
	var PasteImage = require("./paste-image");
	
	
	var pasteImage = new PasteImage();
	
	var ChatEditor = function(){
		var _this = this;
		this.status = "no_context";
		this.editor = $(".chat-editor");
		showPlaceholder(this.editor);
		
		this.editor.focus(function(){
			var placeholder = $(this).find(".placeholder");
			if(placeholder != null){
				placeholder.remove();
			}
			_this.status = "wait_write";
		});
		
		this.editor.blur(function(){
			var context = $(this).text() + $(this).html();
			if(context == ""){
				showPlaceholder($(this));
				_this.status = "no_context";
			}
		});
		pasteImage.addListen(this.editor);
	};
	
	module.exports = ChatEditor;
	
	function showPlaceholder(editor){
		editor.html("<span class=\"placeholder\">"+editor.attr("data-placeholder")+"</span>");
		
	}
	
	
});