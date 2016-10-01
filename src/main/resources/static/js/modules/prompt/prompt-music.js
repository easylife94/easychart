define(function(require,exports,module){
	
	var PromptMusic = function(){
		var music = "music/apple-line";
		this.audio = $("<audio id=\"prompt-music\"></audio>");
		
		//三种类型的音乐文件
		this.audio.append($("<source src=\""+music+".mp3\" type=\"audio/mpeg\">"));
		this.audio.append($("<source src=\""+music+".ogg\" type=\"audio/ogg\">"));
		this.audio.append($("<source src=\""+music+".wav\" type=\"audio/wav\">"));
		
		this.audio.appendTo("body");
		
	}
	module.exports = PromptMusic;
	
	PromptMusic.prototype.sound = function(){
		this.audio.play();
	}
});