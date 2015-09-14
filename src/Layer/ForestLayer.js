/*
 create background
 	function(){
		add background
 	}
 	random position{
		shuffle(array)
 	}
 	create animals with random position
 		function() {
			var randomedPositionArray = randomposition function();
				--> create animal
			onAnimalTap() {
				highlightAnimal function()
				speakAlphabet function()
				animation function()
				speakAnimalName function()

		 		}
		 	}
 Win condition
*/
var ForestLayer = cc.Layer.extend({
	ctor: function() {
		this._super();
		this.createBackground();

	},

	createBackground: function() {
		var backGround = new cc.Sprite(res.forest_jpg);
		var scale = cc.winSize.width / backGround.width;
		backGround.setScale(scale);
		backGround.x = cc.winSize.width/2;
		backGround.y = cc.winSize.height/2;
		this.addChild(backGround);
	},
});
var ForestScene = cc.Scene.extend({
	ctor: function() {
		this._super();

		var forestLayer = new ForestLayer();
		this.addChild(forestLayer);
	}
});
