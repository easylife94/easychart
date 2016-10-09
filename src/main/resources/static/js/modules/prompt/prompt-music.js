define(function(require,exports,module){
	
	var PromptMusic = function(){
		var _this = this;
		
		var music = "music/apple-line";
		this.audio = $("<audio id=\"prompt-music\"></audio>");
		
		//三种类型的音乐文件
		this.audio.append($("<source src=\""+music+".mp3\" type=\"audio/mpeg\">"));
		this.audio.append($("<source src=\""+music+".ogg\" type=\"audio/ogg\">"));
		this.audio.append($("<source src=\""+music+".wav\" type=\"audio/wav\">"));
		
		this.audio.appendTo("body");
		
		this.setting = {
				isOpen : true,
		}
		$(".prompt-music").click(function(){
			_this.switchs();
		});
		
	}
	module.exports = PromptMusic;
	
	PromptMusic.prototype.sound = function(){
		if(this.setting.isOpen){
			this.audio[0].play();
		}
		
	}
	PromptMusic.prototype.switchs = function(){
		if(this.setting.isOpen){
			this.setting.isOpen = false;
			$(".prompt-music").find("i").removeClass("fui-volume").addClass("fui-mute");
		}else{
			this.setting.isOpen = true;
			$(".prompt-music").find("i").removeClass("fui-mute").addClass("fui-volume");
		}
	}
});