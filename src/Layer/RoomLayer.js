var RoomLayer = cc.Layer.extend({
    _kvInstance: null,
    _hudLayer: null,
    _maskLayer: null,
    _objectTouching: null,
    _currentObjectShadeZOrder: null,
    _objects: [],
    _objectNames: [],
    _shadeObjects: [],
    _correctedObject: [],
    _objectDisableds: [],
    _effectLayers: [],
    _warningLabel: null,
    _countDownClock: null,
    _lastClickTime: 0,
    _effectLayerShade: null,
    _effectSmoke:null,
    _allScale: 1,

    _effectAudioID: null,

    _numberItems: 3,
    _isLevelCompleted: false,

    ctor: function() {
        // cc.log("Dev: " + whoAmI);
        this._super();

        this._isLevelCompleted = false;

        this._kvInstance = KVDatabase.getInstance();
        this.resetAllArrays();
        this.createBackground();
        this.addObjects();
        // this.addRefreshButton();
        // this.addBackButton();
        this.addHud();
        this.runHintObjectUp();
        // this.playBackgroundMusic();
        this.runSoundCountDown();
        
        cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: this.onTouchBegan,
                onTouchMoved: this.onTouchMoved,
                onTouchEnded: this.onTouchEnded
        }, this);
    },

    playBackgroundMusic: function() {
        if (cc.audioEngine.isMusicPlaying())
            return
        // play background music
        cc.audioEngine.setMusicVolume(0.2);
        cc.audioEngine.playMusic(res.BEDROOM_mp3, true);
    },

    resetAllArrays: function() {
        this._objects = [];
        this._objectNames = [];
        this._shadeObjects = [];
        this._correctedObject = [];
        this._objectDisableds = [];
        this._effectLayers = [];
    },

    addHud: function() {
        var hudLayer = new HudLayer(this);
        hudLayer.x = 0;
        hudLayer.y = cc.winSize.height - 80;
        this.addChild(hudLayer, 99);

        this._hudLayer = hudLayer;
    },

    addRefreshButton: function() {
        var refreshButton = new ccui.Button(res.Button_Refresh_png, "", "");
        refreshButton.x = cc.winSize.width - refreshButton.width;
        refreshButton.y = refreshButton.height / 2;
        this.addChild(refreshButton);

        refreshButton.addClickEventListener(function() {
            cc.director.replaceScene(new RoomScene());
        });
    },

    addBackButton: function() {
        var backButton = new ccui.Button(res.Back_Button_png, res.Back_Button_Pressed_png, "");
        backButton.x = cc.winSize.width - backButton.width*3;
        backButton.y = backButton.height / 2;

        this.addChild(backButton);

        backButton.addClickEventListener(function() {
            cc.director.replaceScene(new ForestScene());
        });
    },

    createBackground: function() {
        var background = new cc.Sprite(res.room_jpg);
        this._allScale = cc.winSize.width / background.width;

        background.setScale(this._allScale);
        background.x = cc.winSize.width / 2;
        background.y = 0;
        background.anchorY = 0;
        this.addChild(background);

        var roof = new cc.Sprite(res.room_roof_png);
        roof.scale = this._allScale;
        roof.x = cc.winSize.width/2;
        roof.y = cc.winSize.height;
        roof.anchorY = 1;
        this.addChild(roof);

        var roomRibbon = new cc.Sprite(res.room_ribbon_png);
        roomRibbon.x = 0
        roomRibbon.y = cc.winSize.height - 135;
        roomRibbon.anchorX = 0;
        roomRibbon.scale = this._allScale;
        this.addChild(roomRibbon);

        var roomClock = new cc.Sprite(res.room_clock_png);
        roomClock.x = 350 * this._allScale;
        roomClock.y = cc.winSize.height - 195 / this._allScale;
        roomClock.scale = this._allScale;
        this.addChild(roomClock);

        var roomWindow = new cc.Sprite(res.room_window_png);
        roomWindow.x = 620 * this._allScale;
        roomWindow.y = cc.winSize.height - 230 / this._allScale;
        roomWindow.scale = this._allScale;
        this.addChild(roomWindow);
    },

    addObjects: function() {
        var dsInstance = ConfigStore.getInstance();
        this._numberItems = this.getNumberOfObjects();

        var bedroomObjects = dsInstance.getRandomObjects(BEDROOM_ID, this._numberItems);
        var shuffledPositionArray = Utils.shuffle(BEDROOM_ITEMS_POSITION);
        var heavyObjectPositions = Utils.shuffle(BEDROOM_HEAVYWEIGHT_ITEMS_POSITION);
        for ( var i = 0; i < this._numberItems; i++) {
            if (bedroomObjects[i].type === ROOM_ITEM_TYPE.LIGHT_WEIGHT_ITEM)
                this.addObjectButton(shuffledPositionArray[i], bedroomObjects[i].imageName, i);
            else
                this.addObjectButton(heavyObjectPositions[i], bedroomObjects[i].imageName, i);

            this.addObjectShade(bedroomObjects[i], bedroomObjects[i].imageName, i);
        }
        this.runSparklesEffect();
    },

    addObjectButton: function(objPosition, imageName, index) {
        // cc.log("imageName: " + imageName);
        var object = new cc.Sprite("things/" + imageName + ".png");
        self = this;
        object.setAnchorPoint(objPosition.anchorX, objPosition.anchorY);

        object.x = objPosition.x;
        object.y = objPosition.y;
        object.tag = index;
        object.userData = { scaleFactor: 1.5 }
        object.scale = this._allScale * object.userData.scaleFactor;
        this.addChild(object, 2);

        this._objectNames.push({name: imageName, tag: object.tag});

        this.animateObjectIn(object, index);
        this._objects.push(object);
        this.runObjectAction(this, 0,
            function(){
                self._lastClickTime = self._hudLayer.getRemainingTime();
            }
        )
    },

    addObjectShade: function(object, imageName, index) {
        var shadeObject = new cc.Sprite("things/" + imageName + ".png");
        shadeObject.setAnchorPoint(object.anchorPoint);
        shadeObject.setPosition(object.correctPos);
        shadeObject.scale = this._allScale;

        if (this.hadObjectRequired())
            shadeObject.visible = false;
        else {
            shadeObject.visible = true;
            this._currentObjectShadeZOrder = shadeObject.getLocalZOrder();

            shadeObject.shaderProgram = cc.shaderCache.getProgram("SolidColor");
            shadeObject.setLocalZOrder(3);

            this._effectLayerShade = new EffectLayer(shadeObject, "sparkles", SPARKLE_EFFECT_DELAY, SPARKLE_EFFECT_FRAMES, true);   
        }
        // cc.log("Shade " + imageName + ": " + JSON.stringify(shadeObject.getPosition()));

        this.addChild(shadeObject, 1);
        this._shadeObjects.push(shadeObject);
    },

    animateObjectIn: function(object, delay) {
        var oldScale = object.scale;
        object.scale = 0;
        var self = this;
        object.runAction(
            cc.sequence(
                cc.delayTime(delay * ANIMATE_DELAY_TIME),
                cc.callFunc(function() {
                    new EffectLayer(object, "smoke", SMOKE_EFFECT_DELAY, SMOKE_EFFECT_FRAMES, false);
                }),
                cc.scaleTo(0.7, 1 * oldScale).easing(cc.easeElasticOut(0.9))
            )
        );

        this.runObjectAction(this, 0,
            function(){
                self._lastClickTime = self._hudLayer.getRemainingTime();
            }
        )
    },

    checkWonGame: function() {
        // win condition
        if (this._objectDisableds.length == this._numberItems)
            this.completedScene()
    },

    createWarnLabel: function(text, object) {
        // var randSchoolIdx = Math.floor(Math.random() * schoolData.length);
        var randSchoolIdx = Math.floor(Math.random() * 4);
        font = FONT_COLOR[randSchoolIdx];

        text = text.toUpperCase();
        var warnLabel = new cc.LabelBMFont(text, font);
        warnLabel.setScale(1.25);


        // var warnLabel = new cc.LabelTTF(text, "Arial", 24);
        // warnLabel.setColor(cc.color.RED);
        if (object) {
            warnLabel.x = object.x;
            warnLabel.y = object.y + object.height + 10;
        }
        else {
            warnLabel.x = cc.winSize.width / 2;
            warnLabel.y = cc.winSize.height - 110;
        }
        this.addChild(warnLabel, 9999);

        this._warningLabel = warnLabel;
    },

    completedScene: function() {
        // printStackTrace();
        if (this._isLevelCompleted)
            return;
        this._isLevelCompleted = true;

        var starEarned = this._hudLayer.getStarEarned();

        var lbText = "You Win";
        this.createWarnLabel(lbText);

        var elapseTime = this._hudLayer._clock.getElapseTime();
        RequestsManager.getInstance().postGameProgress(Utils.getUserId(), GAME_ID, 3, elapseTime);

        this.increaseAmountGamePlayed();

        this.runObjectAction(this, CHANGE_SCENE_TIME, function() {
                    cc.director.replaceScene(new ForestScene());
                });
    },

    _findTouchedObject: function(touchedPos) {
        var distance = 0;
        var objBoundingBox = null;

        for ( var i = 0; i < this._objects.length; i++) {
            if (this.isObjectDisabled(this._objects[i]))
                continue;
            
            objBoundingBox = this._objects[i].getBoundingBox();
            var isRectContainsPoint = cc.rectContainsPoint(objBoundingBox, touchedPos);
            if (isRectContainsPoint) {
                return this._objects[i];
            }
        }

        return null;
    },

    getSoundConfigByName: function(imageName) {
        // cc.log("imageName: " + imageName);
        var strName = imageName.toUpperCase();
        // cc.log("strName: " + strName);
        for ( var i = 0; i < OBJECT_SOUNDS_LENGTH.length; i++) {
            if (strName === OBJECT_SOUNDS_LENGTH[i].name) {
                return OBJECT_SOUNDS_LENGTH[i];
            }
        }
    },

    getObjectIndex: function(object) {
        for ( var i = 0; i < this._objects.length; i++)
            if (object === this._objects[i])
                return i;
    },

    onTouchBegan: function(touch, event) {
        var targetNode = event.getCurrentTarget();
        var touchedPos = touch.getLocation();

        targetNode._objectTouching = targetNode._findTouchedObject(touchedPos);
        if (!targetNode._objectTouching)
            return false;

        cc.audioEngine.playEffect(res.PICKUP_mp3);
        targetNode.processGameLogic();

        var oldScale = targetNode._objectTouching.scale;
        targetNode._objectTouching.setScale(0.7 * oldScale);
        targetNode._objectTouching.runAction(cc.sequence(
            cc.EaseBounceInOut(cc.scaleTo(0.5, 1.1 * oldScale)),
            cc.EaseBounceInOut(cc.scaleTo(0.5, 1.05 * oldScale))
            ));
        // cc.log("scale")
        targetNode._lastClickTime = targetNode._hudLayer.getRemainingTime();
        // targetNode._effectSmoke.stopRepeatAction();
        var objectPosition = targetNode.getObjectPosWithTouchedPos(touchedPos);
        targetNode._objectTouching.setPosition(objectPosition);

        return true;
    },

    onTouchMoved: function(touch, event) {
        var targetNode = event.getCurrentTarget();
        var touchedPos = touch.getLocation();

        // cc.log(JSON.stringify(touchedPos));

        var objectPosition = targetNode.getObjectPosWithTouchedPos(touchedPos);

        targetNode._objectTouching.setPosition(objectPosition);
        // targetNode._objectTouching.setScale(1.05);

        return true;
    },

    onTouchEnded: function (touch, event) {
        var targetNode = event.getCurrentTarget();

        if (targetNode._effectAudioID)
            cc.audioEngine.stopEffect(targetNode._effectAudioID);
        targetNode._effectAudioID = null;

        //set shadeObject visible to false
        targetNode._lastClickTime = targetNode._hudLayer.getRemainingTime();
        var index = targetNode.getObjectIndex(targetNode._objectTouching);
        targetNode._shadeObjects[index].visible = false;

        targetNode._objectTouching.setLocalZOrder(2);
        targetNode._objectTouching.shaderProgram = cc.shaderCache.getProgram("ShaderPositionTextureColor_noMVP");
        targetNode.handleObjectCorrectPos(index);


        targetNode._objectTouching.runAction(cc.sequence(
            cc.EaseBounceInOut(cc.scaleTo(0.2, 0.7 * targetNode._objectTouching.userData.scaleFactor)),
            cc.EaseBounceInOut(cc.scaleTo(0.2, 1* targetNode._objectTouching.userData.scaleFactor))
            ));
        targetNode._objectTouching = null;
        targetNode.runSparklesEffect();
        targetNode._removeWarnLabel();
        cc.audioEngine.playEffect(res.DROP_mp3);

        return true;
    },

    processGameLogic: function() {
        this._removeWarnLabel();

        this._objectTouching.setLocalZOrder(4);
        this._objectTouching.stopAllActions();
        this.removeObjectAction();
        this._lastClickTime = this._hudLayer.getRemainingTime();
        this.playObjectSound(true);

        this._objectTouching.shaderProgram = cc.shaderCache.getProgram("SpriteDistort");

        //set shadeObject to visible
        var index = this.getObjectIndex(this._objectTouching);
        if (!this.hadObjectRequired()) {
            this.hideAllShadow();
        }
        this.highLightObjectCorrectPos(index);
        this._shadeObjects[index].visible = true;

    },

    runObjectAction: function(object, delayTime, func) {
        object.runAction(cc.sequence(
            cc.delayTime(delayTime),
            cc.callFunc(func)
        ));
    },

    highLightObjectCorrectPos: function(index) {
        var shadeObject = this._shadeObjects[index];
        this._currentObjectShadeZOrder = shadeObject.getLocalZOrder();

        shadeObject.shaderProgram = cc.shaderCache.getProgram("SolidColor");
        shadeObject.setLocalZOrder(5);

        this._effectLayerShade = new EffectLayer(shadeObject, "sparkles", SPARKLE_EFFECT_DELAY, SPARKLE_EFFECT_FRAMES, true);
    },

    handleObjectCorrectPos: function(index) {
        if (!this._objectTouching)
            return;
        var objectPos = this._objectTouching.getPosition();
        var shadePos = this._shadeObjects[index].getPosition();
        var distance = cc.pDistance(objectPos, shadePos);
        cc.audioEngine.stopAllEffects();
        if (distance < 100) {
            this._objectTouching.setPosition(shadePos);
            this._objectTouching.setLocalZOrder(0);
            this._objectTouching.userData.scaleFactor = 1;
            this._objectDisableds.push(this._objectTouching);
            this.removeObjectAction();
            this.playObjectSound(false);
            this.updateProgressBar();
            this._shadeObjects[index].setLocalZOrder(-1);
        }
        if (!this.hadObjectRequired())
            this.showAllShadows();
    },

    getObjectPosWithTouchedPos: function(touchedPos) {
        var objectAnchorPoint = this._objectTouching.getAnchorPoint();
        var objectSize = this._objectTouching.getContentSize();

        var delta = (objectAnchorPoint.y < 0.5) ? 0.5 : 1;

        var objectPosDistance = cc.p(objectSize.width*(1 - objectAnchorPoint.x),
                                    -objectSize.height/2* delta);

        var objectPosition = cc.pSub(touchedPos, objectPosDistance);

        return objectPosition;
    },

    getObjectName: function() {
        for (var i = 0; i < this._objectNames.length; i++) {
            if (this._objectTouching.tag === this._objectNames[i].tag)
                return this._objectNames[i].name;
        }
    },

    isObjectDisabled: function(objectTouching) {
        for (var i = 0; i < this._objectDisableds.length; i++) {
            if (objectTouching === this._objectDisableds[i]){
                return true;
            }
        }
    },

    playObjectSound: function(isDragging){
        var self = this;

        var objectName = this.getObjectName();
        var object = this._objectTouching;
        var str = objectName[0].toUpperCase();
        var soundConfig = this.getSoundConfigByName(objectName);
        // cc.log("soundConfig: " + soundConfig.length);
        var soundNumb = isDragging ? 1 : 2;
        // Show cutscene
        var oldZOrder = object.getLocalZOrder();
        if (!isDragging) {
            str = objectName;
            var mask = new cc.LayerColor(cc.color(0, 0, 0, 200));
            this.addChild(mask, 100);
            this._maskLayer = mask;

            object.setLocalZOrder(101);

            var blockFlag = true;
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: function(touch, event) { return true; },
                onTouchEnded: function(touch, event) {
                    if (GAME_CONFIG.needTouchToHideCutScene) {
                        if (blockFlag)
                            return;

                        self._blockAllObjects = false;
                        self._removeWarnLabel();

                        mask.removeFromParent();
                        self._mask = null;

                        object.setLocalZOrder(oldZOrder);
                    }
                }
            }, mask);
        }

        if (this._effectAudioID)
            cc.audioEngine.stopEffect(this._effectAudioID);
        this._effectAudioID = cc.audioEngine.playEffect(res[objectName.toUpperCase() + "_" + soundNumb + "_mp3"], isDragging);

        object.runAction(cc.sequence(
            cc.callFunc(function() {
                self._blockAllObjects = true;
                self.createWarnLabel(str);
            }),
            cc.delayTime(Math.max(soundConfig.length, 3)),
            cc.callFunc(function() {
                if (GAME_CONFIG.needTouchToHideCutScene) {
                    blockFlag = false;
                } else {
                    self._blockAllObjects = false;
                    if (!isDragging) {
                        self._removeWarnLabel();
                        self.checkWonGame();
                    }

                    if (self._maskLayer) {
                        self._maskLayer.removeFromParent();
                        self._maskLayer = null;
                    }

                    object.setLocalZOrder(oldZOrder);
                }
            })
        ));
    },

    updateProgressBar: function() {
        var percent = this._objectDisableds.length / this._numberItems;
        this._hudLayer.setProgressBarPercentage(percent);
        this._hudLayer.setProgressLabelStr(this._objectDisableds.length);

        var starEarned = 0;
        var objectCorrected = this._objectDisableds.length;
        var starGoals = this.countingStars();
        if (objectCorrected >= starGoals.starGoal1 && objectCorrected < starGoals.starGoal2)
            starEarned = 1;
        if (objectCorrected >= starGoals.starGoal2 && objectCorrected < starGoals.starGoal3)
            starEarned = 2;
        if (objectCorrected >= starGoals.starGoal3)
            starEarned = 3;

        // cc.log("starEarned: " + starEarned);
        this._hudLayer.setStarEarned(starEarned);

        if (starEarned > 0)
            this._hudLayer.addStar("light", starEarned);
    },

    countingStars: function() {
        var starGoal1 = Math.ceil(this._numberItems/3);
        var starGoal2 = Math.ceil(this._numberItems/3 * 2);
        var starGoal3 = this._numberItems;
        return {starGoal1: starGoal1,
                starGoal2: starGoal2, 
                starGoal3: starGoal3};
    },

    runSoundCountDown: function() {
        this.schedule(this.addSoundCountDown, CLOCK_INTERVAL, this._hudLayer.getRemainingTime())
    },

    addSoundCountDown: function() {
        if (this._hudLayer.getRemainingTime() == 5){
            cc.audioEngine.playEffect(res.COUNTDOWN_mp3)
        }
    },

    runHintObjectUp: function() {
        this.schedule(this.showHintObjectUp, CLOCK_INTERVAL, this._hudLayer.getRemainingTime());
    },

    runSparklesEffect: function() {
        for ( var i = 0; i < this._objects.length; i++) {
            if (this.isObjectDisabled(this._objects[i]))
                continue;

            var effect = new EffectLayer(this._objects[i], "sparkles", SPARKLE_EFFECT_DELAY, SPARKLE_EFFECT_FRAMES, true);
            this._effectLayers.push(effect)
        }
    },

    _removeWarnLabel: function() {
        if (this._warningLabel)
            this._warningLabel.removeFromParent();
        this._warningLabel = null;
    },

    removeObjectAction: function() {
        for (var i = 0; i < this._objects.length; i++) {
            this._objects[i].removeAllChildren();
        }
        this._effectLayers = [];
    },

    showHintObjectUp: function() {
        if (this._objectTouching)
            return;
        var deltaTime = this._lastClickTime - this._hudLayer.getRemainingTime();
        if (deltaTime == TIME_HINT) {
            if (this._objects.length > 0) {
                var i = Math.floor(Math.random() * (this._objects.length - 1));
                if (this.isObjectDisabled(this._objects[i]))
                    return;
                var oldScale = this._objects[i].scale;
                this._objects[i].runAction(                               
                                        cc.sequence(
                                            cc.scaleTo(0.1, 0.3 * oldScale),
                                            cc.scaleTo(0.3, 1.2 * oldScale),
                                            cc.scaleTo(0.1, 0.3 * oldScale),
                                            cc.scaleTo(0.3, 1.2 * oldScale),
                                            cc.scaleTo(0.1, 1 * oldScale),
                                            cc.callFunc(function() {
                                                if (self._hudLayer)
                                                    self._lastClickTime = self._hudLayer.getRemainingTime();
                                            })
                                        )                 
                );
            }
            // this.runSparklesEffect();
        }
    },

    increaseAmountGamePlayed: function() {
        var numberGamePlayed = this._kvInstance.getInt("amountGamePlayed", 0);
        numberGamePlayed += 1;
        cc.log("numberGamePlayed : %d", numberGamePlayed)
        this.setNumberOfObjects(numberGamePlayed);
    },

    getNumberOfObjects: function() {
        return this._kvInstance.getInt("numberItems", GAME_CONFIG.objectStartCount);
    },

    setNumberOfObjects: function(numberGamePlayed) {
        this._kvInstance.set("amountGamePlayed", numberGamePlayed);
    },

    hadObjectRequired: function() {
        var requireObjectsToHideAllShadow = GAME_CONFIG.requireObjectsToHideAllShadow;
        if (this._numberItems >= requireObjectsToHideAllShadow)
            return true;
        else
            return false;
    },

    showAllShadows: function() {
        if (this._shadeObjects.length > 0)
            for ( var i = 0; i< this._shadeObjects.length; i++) {
                this._shadeObjects[i].visible = true;
            }
    },

    hideAllShadow: function() {
        if (this._shadeObjects.length > 0)
            for ( var i = 0; i< this._shadeObjects.length; i++) {
                    this._shadeObjects[i].visible = false;
            }
    },
});

var RoomScene = cc.Scene.extend({
    ctor: function() {
        this._super();

        var roomLayer = new RoomLayer();
        this.addChild(roomLayer);
    }
});