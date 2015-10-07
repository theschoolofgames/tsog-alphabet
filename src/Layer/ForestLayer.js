var ForestLayer = cc.Layer.extend({
    _disabledButtons: [],
    _objects: [],
    _objectDisabled: [],
    _hudLayer: null,
    _animalPos: null,
    _dsInstance: null,
    _background: null,
    _warningLabel: null,
    _warningLabel : null,
    _objectTouching: null,
    _countDownClock: null,
    _effectLayer: null,
    _totalSeconds: 0,
    _touchCounting: 0,
    _star: 0,
    _lastClickTime : 0,

    ctor: function() {
        this._super();

        this._dsInstance = DataStore.getInstance();

        this.resetObjectArrays();
        this.createBackground();
        this.createAnimals();
        this.addBackButton();
        this.addRefreshButton();
        // this.createStarsLabel();
        this.addHud();
        this.runHintObjectUp();

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan
        }, this);
    },

    addHud: function() {
        var hudLayer = new HudLayer(this);
        hudLayer.x = 0;
        hudLayer.y = cc.winSize.height - 80;
        this.addChild(hudLayer, 99);

        this._hudLayer = hudLayer;
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
    },

    _isTouchingObject: function(touchedPos) {
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

        targetNode.processGameLogic();

        return true;
    },
    getRamdomPositionMoveto : function(radius, animalOriginPos) {
        var animalPos = null;
        animalPos = cc.p(animalOriginPos.x - Math.random() * radius + 10,
                        animalOriginPos.y - Math.random() * radius + 10);
        cc.log(JSON.stringify(animalPos))
        return animalPos;
    },

    createAnimal : function(position, animalObject, i) {
        var animal =  new cc.Sprite(animalObject.imagePath);
        animal.setAnchorPoint(position.anchorX, position.anchorY);
        animal.x = position.x;
        animal.y = position.y;
        animal.setLocalZOrder(position.z);

        this.addChild(animal);
        this._animalPos = animal.getPosition();
        this.animateAnimalIn(animal, animalObject.type, i);
        this._objects.push(animal);
    },
    runAnimalAction : function(animal , itemId) {
        cc.log("itemId: " + itemId);
        if (itemId === FLY_ITEM)
            this.runFlyAnimalAction(animal);
        if (itemId === LIE_ITEM)
            this.runLieAnimalAction(animal);
        if (itemId === STAND_ITEM)
            this.runStandAnimalAction(animal);
        if (itemId === WATER_ITEM){}
    },

    runFlyAnimalAction: function(animal) {
        var animalPos = animal.getPosition();
        animal.runAction(
                cc.repeatForever(
                    cc.sequence(
                        cc.moveTo(MOVE_DELAY_TIME, this.getRamdomPositionMoveto(20, animalPos)),
                        cc.moveTo(MOVE_DELAY_TIME, this.getRamdomPositionMoveto(20, animalPos)),
                        cc.moveTo(MOVE_DELAY_TIME, this.getRamdomPositionMoveto(20, animalPos)),
                        cc.moveTo(MOVE_DELAY_TIME, animalPos)
                    )
                )
        )
    },

    runLieAnimalAction: function(animal) {
        animal.runAction(
                cc.repeatForever(
                    cc.sequence(
                        cc.scaleTo(1, 0.98),
                        cc.scaleTo(1, 1.02)
                    )
                )
        )
    },

    runStandAnimalAction : function(animal) {
        animal.runAction(
            cc.repeatForever(
                cc.sequence(
                    cc.rotateBy(MOVE_DELAY_TIME, 3),
                    cc.rotateBy(MOVE_DELAY_TIME * 2, -6),
                    cc.rotateBy(MOVE_DELAY_TIME, 3)
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
        backButton.x = cc.winSize.width - backButton.width*3;
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

        var elapseTime = this._hudLayer._clock.getElapseTime();
        RequestsManager.getInstance().postGameProgress(Utils.getUserId(), GAME_ID, this._star, elapseTime);

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
        this.schedule(this.showHintObjectUp, CLOCK_INTERVAL, this._hudLayer.getRemainingTime());
    },

    animateAnimalIn: function(animal, type, delay) {
        animal.scale = 0;
        var self = this;
        animal.runAction(
            cc.sequence(
                cc.delayTime(delay * 0.4),
                cc.callFunc(function() {
                    new EffectLayer(animal, "smoke", SMOKE_EFFECT_DELAY, SMOKE_EFFECT_FRAMES, false);
                }),
                cc.scaleTo(0.7, 1).easing(cc.easeElasticOut(0.9)),
                cc.callFunc(function() {
                    self.runAnimalAction(animal, type);
                })
            )
        );

        this.runObjectAction(this, 0,
            function(){
                self._lastClickTime = self._hudLayer.getRemainingTime()
            }
        )
    },

    showHintObjectUp: function() {
        var deltaTime = this._lastClickTime - this._hudLayer.getRemainingTime();
        if(deltaTime == TIME_HINT) {
            if (this._objects.length > 0) {
                var i = Math.floor(Math.random() * (this._objects.length - 1));
                this._effectLayer = new EffectLayer(this._objects[i], "sparkles", SPARKLE_EFFECT_DELAY, SPARKLE_EFFECT_FRAMES, true);
            };
        }
    },

    removeAnimalAction: function() {
        if (this._effectLayer)
            this._effectLayer.stopRepeatAction();
        this._effectLayer = null;
    },

    processGameLogic: function() {
        this._touchCounting += 1;
        this._hudLayer.setProgressLabelStr(this._touchCounting);
        this._objectTouching.stopAllActions();
        this.removeAnimalAction();
        this._lastClickTime = this._hudLayer.getRemainingTime();
        this.computeStars();

        if (this._warningLabel)
            this._warningLabel.removeFromParent();

        if (this._touchCounting == NUMBER_ITEMS){
            var self = this;
            this.runObjectAction(this, CHANGE_SCENE_TIME, function(){
                self.completedScene()
            });
        }

        this._objectDisabled.push(this._objectTouching);
    }
});
var ForestScene = cc.Scene.extend({
    ctor: function() {
        this._super();

        var forestLayer = new ForestLayer();
        this.addChild(forestLayer);
    }
});
