define(function(require,exports,module){
	var Logitch = require("../logitch/logitch");
	
	var PasteFile = function(){
		
	}
	
	module.exports = PasteFile;
	
	PasteFile.prototype.addListen = function(jom){
		var dom = jom[0];
		console.log(dom);
		dom.addEventListener('paste',function( e ){
			if ( !(e.clipboardData && e.clipboardData.items) ) {
		        return ;
		    }
		    for (var i = 0, len = e.clipboardData.items.length; i < len; i++) {
		        var item = e.clipboardData.items[i];

		        if (item.kind === "string") {
		            item.getAsString(function (str) {
		                // str 是获取到的字符串
		            })
		        } else if (item.kind === "file") {
		            imgReader(item);
		        }
		    }
		});
	}
	
	
	 var imgReader = function( item ){
	        var blob = item.getAsFile(),
	          	reader = new FileReader();
	        reader.onload = function( e ){
	            var img = new Image();
	            img.src = e.target.result;
	            document.body.appendChild( img );
	        }
	  };
});