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
    _touchCounting: 0,
    _warningLabel: null,
    _disabledButtons: [],

	ctor: function() {
		this._super();

        this.resetObjectArrays();
		this.createBackground();
		this.createAnimals();
        this.addBackButton();
        this.addRefreshButton();
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

        var self = this;
        buttonAnimal.addClickEventListener(function() {
            self._touchCounting += 1;
            if (self._warningLabel)
                self._warningLabel.removeFromParent()

            // create label when click on animal
            self.createWarnLabel("clicked on animal!" + i);

            if (self._touchCounting == 6) {
                self.completedScene();
            }
            this.setTouchEnabled(false);

        });
    },

    addRefreshButton: function() {
        var refreshButton = new ccui.Button(res.Button_Refresh_png, "", "");
        refreshButton.x = cc.winSize.width - refreshButton.width;
        refreshButton.y = cc.winSize.height - refreshButton.height / 2;

        this.addChild(refreshButton);

        refreshButton.addClickEventListener(function() {
            cc.director.replaceScene(new ForestScene());
        });
    },

    addBackButton: function() {
        var backButton = new ccui.Button(res.Back_Button_png, res.Back_Button_Pressed_png, "");
        backButton.x = backButton.width;
        backButton.y = cc.winSize.height - backButton.height / 2;

        this.addChild(backButton);

        backButton.addClickEventListener(function() {
            cc.director.replaceScene(new RoomScene());
        });
    },

    createWarnLabel: function(text, object) {
        var warnLabel = new cc.LabelTTF(text, "Arial", 32);
        warnLabel.setColor(cc.color.RED);
        if (object) {
            warnLabel.x = object.x;
            warnLabel.y = object.y + object.height + 10;
        }
        else {
            warnLabel.x = cc.winSize.width / 2;
            warnLabel.y = cc.winSize.height - 100;
        }
        this.addChild(warnLabel);

        this._warningLabel = warnLabel;
    },

    resetObjectArrays: function() {
        this._disabledButtons = [];
    },

    completedScene: function() {
        if (this._warningLabel)
            this._warningLabel.removeFromParent()

        this.createWarnLabel("Scene Completed!");
        this.runAction(cc.sequence(
            cc.delayTime(2),
            cc.callFunc(function() {
                cc.director.replaceScene(new RoomScene());
            })
        ));
    },
});
var ForestScene = cc.Scene.extend({
	ctor: function() {
		this._super();

		var forestLayer = new ForestLayer();
		this.addChild(forestLayer);
	}
});
