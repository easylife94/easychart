define(function(require,exports,module){
	
	var Logitch = require("../logitch/logitch");
	var DragFile = require("./drag-file");
	var PasteImage = require("./paste-image");
	
	
	var pasteImage = new PasteImage();
	
	var ChatEditor = function(){
		this.editor = $(".chat-editor");
		showPlaceholder(this.editor);
		
		this.editor.focus(function(){
			var placeholder = $(this).find(".placeholder");
			if(placeholder != null){
				placeholder.remove();
			}
		});
		
		this.editor.blur(function(){
			showPlaceholder($(this));
		});
		
		pasteImage.addListen(this.editor);
	};
	
	module.exports = ChatEditor;
	
	function showPlaceholder(editor){
		var context = editor.text() + editor.html();
		if(context == ""){
			editor.html("<span class=\"placeholder\">"+editor.attr("data-placeholder")+"</span>");
		}
	}
	
	
});