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
		this.createAnimals();

	},

	createBackground: function() {
		var backGround = new cc.Sprite(res.forest_jpg);
		var scale = cc.winSize.width / backGround.width;
		backGround.setScale(scale);
		backGround.x = cc.winSize.width/2;
		backGround.y = cc.winSize.height/2;
		this.addChild(backGround);
	},

	createAnimals: function() {
 		var dsInstance = DataStore.getInstance();
 		var randomedAnimalArray = dsInstance.getRandomObjects(FOREST_ID, NUMBER_ITEMS);
 		var randomedPositionArray = dsInstance.getRandomPositions(FOREST_ID, NUMBER_ITEMS);

 		for (i = 0; i < NUMBER_ITEMS; i++)
 			this.createAnimalButton(randomedPositionArray[i], randomedAnimalArray[i], i);
 			
    },

    createAnimalButton : function(buttonPosition, imagePath, i) {
    	var buttonAnimal =  new ccui.Button(res.GrayButton_png,"", "");
    	buttonAnimal.scale = 0;
    	buttonAnimal.setAnchorPoint(buttonPosition.anchorX, buttonPosition.anchorY);

    	buttonAnimal.x = buttonPosition.x;
    	buttonAnimal.y =  buttonPosition.y;
    	buttonAnimal.runAction(
                cc.sequence(
                    cc.delayTime(i*0.1),
                    cc.scaleTo(0.5, 1).easing(cc.easeElasticOut(0.6))
                ));
    	this.addChild(buttonAnimal);
    },

});
var ForestScene = cc.Scene.extend({
	ctor: function() {
		this._super();

		var forestLayer = new ForestLayer();
		this.addChild(forestLayer);
	}
});
