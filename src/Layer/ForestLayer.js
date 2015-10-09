var ForestLayer = cc.Layer.extend({
    _effectLayers: [],
    _objects: [],
    _objectDisabled: [],
    _animalNames: [],
    _blockLayer: null,
    _hudLayer: null,
    _animalPos: null,
    _animalName: null,
    _dsInstance: null,
    _background: null,
    _warningLabel: null,
    _warningLabel : null,
    _objectTouching: null,
    _countDownClock: null,
    _totalSeconds: 0,
    _touchCounting: 0,
    _star: 0,
    _lastClickTime : 0,
    _blockAllObjects: false,

    _allScale: 1,

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
        this._lastClickTime = this._hudLayer.getRemainingTime();
    },

    createBackground: function() {
        var background = new cc.Sprite(res.BG_jpg);
        this._allScale = cc.winSize.width / background.width;

        background.x = cc.winSize.width;
        background.y = cc.winSize.height / 2;
        background.anchorX = 1;
        // background.scale = this._allScale;
        background.setLocalZOrder(-1);
        this.addChild(background);

        var forestBgData = this._dsInstance.getPositions(FOREST_BACKGROUND_ID);
        for ( var i = 0; i < forestBgData.length; i++) {
            var element = forestBgData[i];
            var backgroundElt = new cc.Sprite(element.imageName);
            backgroundElt.x = element.x;
            backgroundElt.y = element.y;
            backgroundElt.setAnchorPoint(element.anchorX, element.anchorY);
            backgroundElt.scale = this._allScale;
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
            cc.log("animalPositionArray: " + JSON.stringify(animalPositionArray[i]) + "\n");
            this.createAnimal(animalPositionArray[i], animals[i], i);
        }
        this.runSparklesEffect();
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

    _isTouchingDisabledObject: function(touchedPos) {
        //check if touched on a disabled animal --> play its sound but not process anything
        var distance = 0;
        var objBoundingBox = null;
        for ( var i = 0; i < this._objectDisabled.length; i++) {

            objBoundingBox = this._objectDisabled[i].getBoundingBox();
            var isRectContainsPoint = cc.rectContainsPoint(objBoundingBox, touchedPos);
            if (isRectContainsPoint) {
                // cc.log("isRectContainsPoint")
                this._objectTouching = this._objectDisabled[i];
                this.playAnimalSound();
                return true;
            }
        }
    },

    onTouchBegan: function(touch, event) {
        var targetNode = event.getCurrentTarget();
        var touchedPos = touch.getLocation();

        if (targetNode._blockAllObjects)
            return false;

        if (targetNode._isTouchingDisabledObject(touchedPos))
            return false;

        if (!targetNode._isTouchingObject(touchedPos))
            return false;
        // return if the objectTouching is disabled
        if (targetNode._isObjectDisabled())
            return false;

        targetNode.processGameLogic();
        targetNode.runSparklesEffect();
        
        return true;
    },

    _isObjectDisabled: function() {
        for (var i = 0; i < this._objectDisabled.length; i++) {
            if (this._objectTouching === this._objectDisabled[i]) {
                cc.log("_isObjectDisabled")
                this.playAnimalSound();
                return true;
            }
        }
    },

    getRamdomPositionMoveto : function(radius, animalOriginPos) {
        var animalPos = null;
        animalPos = cc.p(animalOriginPos.x - Math.random() * radius + 10,
                        animalOriginPos.y - Math.random() * radius + 10);
        return animalPos;
    },

    createAnimal : function(position, animalObject, i) {
        var animal =  new cc.Sprite("animals/" + animalObject.imageName + ".png");
        animal.setAnchorPoint(position.anchorX, position.anchorY);
        animal.x = position.x;
        animal.y = position.y;
        animal.tag = i;
        animal.userData = animalObject;
        animal.setLocalZOrder(position.z);

        this.addChild(animal);
        this._animalPos = animal.getPosition();

        this._animalNames.push({name: animalObject.imageName, tag: animal.tag});

        this.animateAnimalIn(animal, animalObject.type, i);
        this._objects.push(animal);
    },

    getAnimalSoundConfigByName: function(imageName) {
        var strName = imageName.toUpperCase();
        for ( var i = 0; i < ANIMAL_SOUNDS_LENGTH.length; i++) {
            if (strName === ANIMAL_SOUNDS_LENGTH[i].name)
                return ANIMAL_SOUNDS_LENGTH[i];
        }
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
        this._effectLayers = [];
        this._animalNames = [];
        this._touchCounting = 0;
    },

    addRefreshButton: function() {
        var refreshButton = new ccui.Button(res.Button_Refresh_png, "", "");
        refreshButton.x = cc.winSize.width - refreshButton.width;
        refreshButton.y = refreshButton.height / 2;

        this.addChild(refreshButton, 100);

        refreshButton.addClickEventListener(function() {
            cc.director.replaceScene(new ForestScene());
        });
    },

    addBackButton: function() {
        var backButton = new ccui.Button(res.Back_Button_png, res.Back_Button_Pressed_png, "");
        backButton.x = cc.winSize.width - backButton.width*3;
        backButton.y = backButton.height / 2;

        this.addChild(backButton, 100);

        backButton.addClickEventListener(function() {
            cc.director.replaceScene(new RoomScene());
        });
    },

    createWarnLabel: function(text, size, object) {
        var randSchoolIdx = Math.floor(Math.random() * 4);
        font = FONT_COLOR[randSchoolIdx];

        text = text.toUpperCase();
        var warnLabel = new cc.LabelBMFont(text, font);
        warnLabel.setScale(0.5);
        // var warnLabel = new cc.LabelTTF(text, "Arial", size);
        // warnLabel.setColor(cc.color.RED);
        if (object) {
            warnLabel.x = object.x;
            warnLabel.y = object.y;
        }
        else {
            warnLabel.x = cc.winSize.width / 2;
            warnLabel.y = cc.winSize.height - 110;
        }
        this.addChild(warnLabel, 9999);

        this._warningLabel = warnLabel;
    },

    checkWonGame: function() {
        if (this._touchCounting == NUMBER_ITEMS)
            this.completedScene();
    },

    completedScene: function() {
        if (this._warningLabel)
            this._warningLabel.removeFromParent();

        var elapseTime = this._hudLayer._clock.getElapseTime();
        RequestsManager.getInstance().postGameProgress(Utils.getUserId(), GAME_ID, this._star, elapseTime);

        var starEarned = this._hudLayer.getStarEarned();
        var str = (starEarned > 1) ? " stars" : " star";
        var lbText = "Scene Completed!";
        this.createWarnLabel(lbText, 24);
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

    getAnimalName: function() {
        for (var i = 0; i < this._animalNames.length; i++) {
            if (this._objectTouching.tag === this._animalNames[i].tag)
                return this._animalNames[i].name;
        }
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
                // self._lastClickTime = self._hudLayer.getRemainingTime()
            }
        )
    },

    showHintObjectUp: function() {
        var self = this;
        var deltaTime = this._lastClickTime - this._hudLayer.getRemainingTime();
        if(deltaTime == TIME_HINT) {
            if (this._objects.length > 0) {
                var i = Math.floor(Math.random() * (this._objects.length - 1));
                this._objects[i].runAction(
                                        cc.sequence(
                                            cc.scaleTo(0.3, 0.8),
                                            cc.scaleTo(0.3, 1.2),
                                            cc.scaleTo(0.3, 0.8),
                                            cc.scaleTo(0.3, 1.2),
                                            cc.scaleTo(0.3, 1),
                                            cc.callFunc(function() {
                                                self._lastClickTime = self._hudLayer.getRemainingTime();
                                            })
                                        )
                );
            }
        }
    },

    runSparklesEffect: function() {
        for ( var i = 0; i < this._objects.length; i++) {
            var effect = new EffectLayer(this._objects[i], "sparkles", SPARKLE_EFFECT_DELAY, SPARKLE_EFFECT_FRAMES, true);
            this._effectLayers.push(effect)
        }
    },

    removeAnimalEffect: function() {
        for (var i = 0; i < this._objects.length; i++) {
            this._objects[i].removeAllChildren();
        }
        this._effectLayers = [];
    },

    processGameLogic: function() {
        this._removeWarnLabel();

        this._touchCounting += 1;
        this.updateProgressBar();
        // this._objectTouching.stopAllActions();
        this._objectTouching.removeAllChildren();
        this.removeAnimalEffect();
        this._lastClickTime = this._hudLayer.getRemainingTime();
        this.playAnimalSound();

        this._objectDisabled.push(this._objectTouching);
        this._objectTouching = null;
    },

    playAnimalSound: function(){
        var self = this;
        var animalName = this.getAnimalName();
        var animal = this._objectTouching;
        var str = animalName;
        var soundConfig = this.getAnimalSoundConfigByName(animalName);

        // Show cutscene
        var oldZOrder = animal.getLocalZOrder();
        var mask = new cc.LayerColor(cc.color(0, 0, 0, 200));
        this.addChild(mask, 100);
        animal.setLocalZOrder(101);

        var blockFlag = true;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event) { return true; },
            onTouchEnded: function(touch, event) {
                if (blockFlag)
                    return;

                self._blockAllObjects = false;
                self._removeWarnLabel();

                mask.removeFromParent();
                // animal.stopAllActions();
                animal.setLocalZOrder(oldZOrder);
                self.checkWonGame();
            }
        }, mask);

        cc.audioEngine.playEffect(res[animalName.toUpperCase() + "_mp3"]);

        animal.runAction(cc.sequence(
            cc.callFunc(function() {
                self.createWarnLabel(str, 32);
                self._blockAllObjects = true;
                // self.animateAnimalIn(animal, animal.userData.type, 0);
            }),
            // cc.scaleTo(1, 0.95),
            // cc.scaleTo(1, 1.05),
            cc.delayTime(soundConfig.length + 0.5),
            cc.callFunc(function() {
                blockFlag = false;
            })
        ));
    },

    _removeWarnLabel: function() {
        if (this._warningLabel)
            this._warningLabel.removeFromParent();
        this._warningLabel = null;
    },

    updateProgressBar: function() {
        var percent = this._touchCounting / NUMBER_ITEMS;
        this._hudLayer.setProgressBarPercentage(percent);
        this._hudLayer.setProgressLabelStr(this._touchCounting);

        var starEarned = 0;
        var objectCorrected = this._touchCounting;

        if (objectCorrected >= STAR_GOAL_1 && objectCorrected < STAR_GOAL_2)
            starEarned = 1;
        if (objectCorrected >= STAR_GOAL_2 && objectCorrected < STAR_GOAL_3)
            starEarned = 2;
        if (objectCorrected >= STAR_GOAL_3)
            starEarned = 3;

        this._hudLayer.setStarEarned(starEarned);

        if (starEarned > 0)
            this._hudLayer.addStar("light", starEarned);
    },
});
var ForestScene = cc.Scene.extend({
    ctor: function() {
        this._super();

        var forestLayer = new ForestLayer();
        this.addChild(forestLayer);
    }
});
