var ForestLayer = cc.Layer.extend({
    _disabledButtons: [],
    _objects: [],
    _objectDisabled: [],
    _animalPos: null,
    _touchCounting: 0,
    _dsInstance: null,
    _background: null,
    _warningLabel: null,
    _warningLabel : null,
    _objectTouching: null,
    _countDownClock: null,
    _starLabel: null,
    _totalSeconds: 0,
    _animalRandomPos: null,
    _star: 0,

	ctor: function() {
		this._super();

        this._dsInstance = DataStore.getInstance();

        this.resetObjectArrays();
		this.createBackground();
		this.createAnimals();
        this.addBackButton();
        this.addRefreshButton();
        this.addCountDownClock();
        this.createStarsLabel();

		cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan
        }, this);
	},

	createBackground: function() {
		var background = new cc.Sprite(res.BG_jpg);
        background.x = cc.winSize.width / 2;
        background.y = cc.winSize.height / 2;
        background.setLocalZOrder(0);
		this.addChild(background);

        var forestBgData = this._dsInstance.getPositions(FOREST_BACKGROUND_ID);
        for ( var i = 0; i < forestBgData.length; i++) {
            var element = forestBgData[i];
            var backgroundElt = new cc.Sprite(element.imageName);
            backgroundElt.x = element.x;
            backgroundElt.y = element.y;
            backgroundElt.setAnchorPoint(element.anchorX, element.anchorY);
            this.addChild(backgroundElt, element.z);
            if (i < 3)
                this.runCloudsAction(backgroundElt);
        }
	},

    runCloudsAction: function(element) {
        var randomedRunningTime = 0;
        var endPoint = null;
        randomedRunningTime = (Math.random() * 5 + 1) * 100;
        endPoint = cc.p(cc.winSize.width, element.y);
        element.runAction(
            cc.repeatForever(
                cc.sequence(
                    cc.moveTo(randomedRunningTime, endPoint)
                )
            )
        )
    },

	createAnimals: function() {
 		var animals = this._dsInstance.getObjects(FOREST_ID, NUMBER_ITEMS);
 		for ( var i = 0; i < NUMBER_ITEMS; i++) {
            var animalPositionArray = this.getAnimalPositionType(animals[i].type);
 			this.createAnimal(animalPositionArray[i], animals[i].imagePath, i);
        }
    },

    _isTouchingObject: function(touchedPos) {
        // nếu vị trí bấm vào nằm trong object thì gán object đó vào _objectTouching để sử dụng
        var distance = 0;
        var objBoundingBox = null;
        for ( var i = 0; i < this._objects.length; i++) {
            objBoundingBox = this._objects[i].getBoundingBox();
            var isRectContainsPoint = cc.rectContainsPoint(objBoundingBox, touchedPos);
            if (isRectContainsPoint) {
                this._objectTouching = this._objects[i];
                return true;
            }
        }
    },

    onTouchBegan: function(touch, event) {
        var targetNode = event.getCurrentTarget();
        var touchedPos = touch.getLocation();
        if (!targetNode._isTouchingObject(touchedPos))
            return false;
        // return if the objectTouching is disabled
        for (var i = 0; i < targetNode._objectDisabled.length; i++) {
            if (targetNode._objectTouching === targetNode._objectDisabled[i])
                return false
        }
        targetNode._touchCounting += 1;
        targetNode.computeStars();
        if (targetNode._warningLabel)
            targetNode._warningLabel.removeFromParent();

        targetNode.createWarnLabel("animallll", 32, targetNode._objectTouching);

        if (targetNode._touchCounting == NUMBER_ITEMS){
            targetNode.runObjectAction(targetNode._warningLabel, CHANGE_SCENE_TIME, function(){
                targetNode.completedScene()
            });
        }
        targetNode._objectDisabled.push(targetNode._objectTouching);

        return true;
    },
    getRamdomPositionMoveto : function(radius) {
        var animalPos = null;
        animalPos = cc.p(this._animalPos.x - Math.random() * radius + 10, this._animalPos.y - Math.random() * radius + 10);
        return animalPos;
    },

    createAnimal : function(position, imagePath, i) {
        // cc.log("createAnimal--- " + imagePath);
    	var animal =  new cc.Sprite("#" + imagePath);
    	animal.scale = 0;
    	animal.setAnchorPoint(position.anchorX, position.anchorY);
        var area = 0;
    	animal.x = position.x;
    	animal.y = position.y;
        this._animalPos = cc.p(animal.x, animal.y)
        animal.setLocalZOrder(position.z);
    	animal.runAction(
            cc.sequence(
                cc.delayTime(i*0.1),
                cc.scaleTo(0.5, 1).easing(cc.easeElasticOut(0.6))
            ));
    	this.addChild(animal);
    	this._objects.push(animal);
        this.runAnimalAction(animal,area);

    },
    runAnimalAction : function(animal , area) {
        if (area == FlY_ID)
            this.runFlyAnimalAction(animal);
        if (area == LIE_ID)
            this.runLieAnimalAction(animal);
        if (area == STAND_ID)
            this.runStandAnimalAction(animal);
        if (area == WATER_ID)
    },

    runFlyAnimalAction: function(animal) {
        animal.runAction(
                cc.repeatForever(
                    cc.sequence(
                        cc.moveTo(MOVE_DELAY_TIME, this.getRamdomPositionMoveto(20)),
                        cc.moveTo(MOVE_DELAY_TIME, this.getRamdomPositionMoveto(20)),
                        cc.moveTo(MOVE_DELAY_TIME, this.getRamdomPositionMoveto(20)),
                        cc.moveTo(MOVE_DELAY_TIME, this._animalPos)
                    )
                )
        )
    },

    runLieAnimalAction: function(animal) {
        animal.runAction(
                cc.repeatForever(
                    cc.sequence(
                        cc.moveTo(MOVE_DELAY_TIME, this.getRamdomPositionMoveto(10)),
                        cc.moveTo(MOVE_DELAY_TIME, this.getRamdomPositionMoveto(10)),
                        cc.moveTo(MOVE_DELAY_TIME, this.getRamdomPositionMoveto(10)),
                        cc.moveTo(MOVE_DELAY_TIME, this._animalPos)
                    )
                )
        )
    },
    runStandAnimalAction : function(animal) {
        animal.runAction(
            cc.repeatForever(
                cc.sequence(
                    cc.rotateBy(MOVE_DELAY_TIME, 10),
                    cc.rotateBy(MOVE_DELAY_TIME * 2, -20),
                    cc.rotateBy(MOVE_DELAY_TIME, 10)
                    )
                )
            )
    },

    resetObjectArrays: function() {
        this._objects = [];
        this._objectDisabled = [];
        this._touchCounting = 0;
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

    createWarnLabel: function(text, size, object) {

        var warnLabel = new cc.LabelTTF(text, "Arial", size);
        warnLabel.setColor(cc.color.RED);
        if (object) {
            warnLabel.x = object.x;
            warnLabel.y = object.y;
        }
        else {
            warnLabel.x = cc.winSize.width / 2;
            warnLabel.y = cc.winSize.height - 100;
        }
        this.addChild(warnLabel,99);

        this._warningLabel = warnLabel;
    },

    completedScene: function() {
        if (this._warningLabel)
            this._warningLabel.removeFromParent();

        RequestsManager.getInstance().postGameProgress(USER_ID, GAME_ID, this._star, this._countDownClock.getElapseTime());

        this.createWarnLabel("Scene Completed!", 32);
        this.runObjectAction(this, CHANGE_SCENE_TIME, function() {
                    cc.director.replaceScene(new RoomScene());
                });
    },

    runObjectAction: function(object, delayTime, func) {
    	object.runAction(cc.sequence(
    		cc.delayTime(delayTime),
    		cc.callFunc(func)
		));
    },

    addCountDownClock: function() {
        var self = this;
        this._countDownClock = new Clock(300, function(){
            self.completedScene();
        });
        this._countDownClock.x = cc.winSize.width / 2 - 10;
        this._countDownClock.y = cc.winSize.height - 20;
        this.addChild(this._countDownClock, 99);
    },

    createStarsLabel: function() {
        var starLabel = new cc.LabelTTF("0 star", "Arial", 32);
        starLabel.x = cc.winSize.width/2 - 30;
        starLabel.y = cc.winSize.height - 50;
        starLabel.setColor(cc.color.RED);
        this.addChild(starLabel, 99);

        this._starLabel = starLabel;
    },

    computeStars: function() {
        if (!this._starLabel)
            return;

        if (this._touchCounting == 3)
            this._star = 1;
        if (this._touchCounting == 4 || this._touchCounting == 5)
            this._star = 2;
        if (this._touchCounting == 6)
            this._star = 3;

        this._starLabel.setString(this._star + " star" + (this._star > 1 ? 's' : ''));
    },

    addShuffledAnimalPosArray: function() {
        var flyPositionArray = shuffle(FOREST_FLY_POSITION);
        var groundPositionArray = shuffle(FOREST_GROUND_POSITION);
        var waterPositionArray = shuffle(FOREST_WATER_POSITION);

        return {flyPositionArray: flyPositionArray, groundPositionArray: groundPositionArray, waterPositionArray: waterPositionArray};
    },

    getAnimalPositionType: function(type) {
        var shuffledArrays = this.addShuffledAnimalPosArray();
        var animalPositionArray = null;
        if (type === FLY_ITEM)
            animalPositionArray = shuffledArrays.flyPositionArray
        if (type === LIE_ITEM || type === STAND_ITEM)
            animalPositionArray = shuffledArrays.groundPositionArray
        if (type === WATER_ITEM)
            animalPositionArray = shuffledArrays.waterPositionArray

        return animalPositionArray
    }

});
var ForestScene = cc.Scene.extend({
	ctor: function() {
		this._super();

		var forestLayer = new ForestLayer();
		this.addChild(forestLayer);
	}
});
