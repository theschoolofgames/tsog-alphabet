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
    _lastClickTime : 0,
    _animalAction: null,

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
        this.runHintObjectUp();

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
        var shuffledArrays = this.addShuffledAnimalPosArray();
 		for ( var i = 0; i < NUMBER_ITEMS; i++) {
            var animalPositionArray = this.getAnimalPositionType(animals[i].type, shuffledArrays);
 			this.createAnimal(animalPositionArray[i], animals[i], i);
        }
        this._objects;
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
                this._objects.splice(i,1);
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
        targetNode._objectTouching.stopAllActions();
        targetNode.removeAnimalAction();
        targetNode._lastClickTime = targetNode._countDownClock.getRemainingTime();
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

    createAnimal : function(position, animalObject, i) {
        // cc.log("createAnimal--- " + imagePath);
    	var animal =  new cc.Sprite("#" + animalObject.imagePath);
    	animal.setAnchorPoint(position.anchorX, position.anchorY);
        animal.x = position.x;
        animal.y = position.y;
        animal.setLocalZOrder(position.z);

        this.addChild(animal);

        this._animalPos = animal.getPosition();
        this.animateAnimalIn(animal, animalObject.type, i);
        this._objects.push(animal);
        var itemId = animalObject.type;
        this.runAnimalAction(animal, itemId);

    },
    runAnimalAction : function(animal , itemId) {
        if (itemId === FLY_ITEM)
            this.runFlyAnimalAction(animal);
        if (itemId === LIE_ITEM)
            this.runLieAnimalAction(animal);
        if (itemId === STAND_ITEM)
            this.runStandAnimalAction(animal);
        if (itemId === WATER_ITEM){}
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

        RequestsManager.getInstance().postGameProgress(Utils.getUserId(), GAME_ID, this._star, this._countDownClock.getElapseTime());

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
        var flyPositionArray = Utils.shuffle(FOREST_FLY_POSITION);
        var groundPositionArray = Utils.shuffle(FOREST_GROUND_POSITION);
        var waterPositionArray = Utils.shuffle(FOREST_WATER_POSITION);

        return {flyPositionArray: flyPositionArray, groundPositionArray: groundPositionArray, waterPositionArray: waterPositionArray};
    },

    getAnimalPositionType: function(type , shuffledArrays) {
        var animalPositionArray = null;
        if (type === FLY_ITEM)
            animalPositionArray = shuffledArrays.flyPositionArray
        if (type === LIE_ITEM || type === STAND_ITEM)
            animalPositionArray = shuffledArrays.groundPositionArray
        if (type === WATER_ITEM)
            animalPositionArray = shuffledArrays.waterPositionArray

        return animalPositionArray
    },

    runHintObjectUp: function() {
        this.schedule(this.showHintObjectUp, CLOCK_INTERVAL, this._countDownClock.getRemainingTime());
    },

    runHintAction: function() {
        this._animalAction =  cc.repeatForever(cc.sequence(
                                            cc.scaleTo(0.5, 1.2),
                                            cc.scaleTo(0.2, 0.8),
                                            cc.scaleTo(0.4, 1)
                                        ))
        return this._animalAction;
    },

    animateAnimalIn: function(animal, type, deltaTime) {
        animal.scale = 0;
        action = cc.scaleTo(0.5, 1).easing(cc.easeElasticOut(0.9))
        this.addSmokeEffect();

        animal.runAction(
            cc.sequence(
                cc.fadeTo(0.2, 0),
                cc.fadeTo(0.3, 255),
                cc.scaleTo(0.5, 1).easing(cc.easeElasticOut(0.6))
            )
        );
    },

    addSmokeEffect: function() {

    },

    showHintObjectUp: function() {
        var deltaTime = this._lastClickTime - this._countDownClock.getRemainingTime();
        cc.log("deltaTime: " + deltaTime);
        if(deltaTime == TIME_HINT) {
            if (this._objects.length > 0) {
                var i = Math.floor(Math.random() * (this._objects.length - 1));
                cc.log("i: "+ i);
                this._objects[i].runAction(this.runHintAction())
                cc.log("hint");
            };
            // if (this._objects.length == 0)
            //     return false
        }
    },

    removeAnimalAction: function() {
        for ( var i = 0; i < this._objects.length; i++) {
            this._objects[i].stopAction(this._animalAction);
        }
    },
});
var ForestScene = cc.Scene.extend({
	ctor: function() {
		this._super();

		var forestLayer = new ForestLayer();
		this.addChild(forestLayer);
	}
});
