var RoomLayer = cc.Layer.extend({
    _hudLayer: null,
    _maskLayer: null,
    _objectTouching: null,
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

    ctor: function() {
        // cc.log("Dev: " + whoAmI);
        this._super();

        this.resetAllArrays();
        this.createBackground();
        this.addObjects();
        this.addRefreshButton();
        this.addBackButton();
        this.addHud();
        this.runHintObjectUp();

        cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: this.onTouchBegan,
                onTouchMoved: this.onTouchMoved,
                onTouchEnded: this.onTouchEnded
        }, this);
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
        var dsInstance = DataStore.getInstance();

        var bedroomObjects = dsInstance.getObjects(BEDROOM_ID, NUMBER_ITEMS);
        var shuffledPositionArray = Utils.shuffle(BEDROOM_ITEMS_POSITION);
        var heavyObjectPositions = Utils.shuffle(BEDROOM_HEAVYWEIGHT_ITEMS_POSITION);
        for ( var i = 0; i < NUMBER_ITEMS; i++) {
            if (bedroomObjects[i].type === LIGHT_WEIGHT_ITEM)
                this.addObjectButton(shuffledPositionArray[i], bedroomObjects[i].imageName, i);
            else
                this.addObjectButton(heavyObjectPositions[i], bedroomObjects[i].imageName, i);

            this.addObjectShade(bedroomObjects[i], bedroomObjects[i].imageName);
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
        object.scale = this._allScale;
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

    addObjectShade: function(object, imageName) {
        var shadeObject = new cc.Sprite("things/" + imageName + ".png");
        shadeObject.setAnchorPoint(object.anchorPoint);
        shadeObject.setPosition(object.correctPos);
        shadeObject.visible = false;
        shadeObject.scale = this._allScale;

        // cc.log("Shade " + imageName + ": " + JSON.stringify(shadeObject.getPosition()));

        this.addChild(shadeObject, 1);
        this._shadeObjects.push(shadeObject);
    },

    animateObjectIn: function(object, delay) {
        object.scale = 0;
        var self = this;
        object.runAction(
            cc.sequence(
                cc.delayTime(delay * 0.4),
                cc.callFunc(function() {
                    new EffectLayer(object, "smoke", SMOKE_EFFECT_DELAY, SMOKE_EFFECT_FRAMES, false);
                }),
                cc.scaleTo(0.7, 1 * this._allScale).easing(cc.easeElasticOut(0.9))
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
        if (this._objectDisableds.length == NUMBER_ITEMS)
            this.completedScene()
    },

    createWarnLabel: function(text, object) {
        // var randSchoolIdx = Math.floor(Math.random() * schoolData.length);
        var randSchoolIdx = Math.floor(Math.random() * 4);
        font = FONT_COLOR[randSchoolIdx];

        text = text.toUpperCase();
        var warnLabel = new cc.LabelBMFont(text, font);
        warnLabel.setScale(0.5);


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
        this.addChild(warnLabel);

        this._warningLabel = warnLabel;
    },

    completedScene: function() {
        // cc.log("completedScene")

        var starEarned = this._hudLayer.getStarEarned();
        var str = (starEarned > 1) ? " stars" : " star";
        var lbText = "Scene Completed!";
        this.createWarnLabel(lbText);
        var elapseTime = this._hudLayer._clock.getElapseTime();
        RequestsManager.getInstance().postGameProgress(Utils.getUserId(), GAME_ID, 3, elapseTime);
        this.runObjectAction(this, CHANGE_SCENE_TIME, function() {
                    cc.director.replaceScene(new ForestScene());
                });
    },

    _isTouchingObject: function(touchedPos) {
        //disable multiTouch
        if (this._objectTouching)
            return false;

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
        if (!targetNode._isTouchingObject(touchedPos))
            return false;
        // return if the objectTouching is disabled
        if (targetNode.isObjectDisabled(targetNode._objectTouching)) {
            targetNode._objectTouching = null;
            return false;
        }
        cc.audioEngine.playEffect(res.PICKUP_mp3);
        targetNode.processGameLogic();

        targetNode._objectTouching.setScale(0.7);
        targetNode._objectTouching.runAction(cc.sequence(
            cc.EaseBounceInOut(cc.scaleTo(0.5, 1.1)),
            cc.EaseBounceInOut(cc.scaleTo(0.5, 1.05))
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
        //set shadeObject visible to false
        var index = targetNode.getObjectIndex(targetNode._objectTouching);
        targetNode._shadeObjects[index].visible = false;
        targetNode._lastClickTime = targetNode._hudLayer.getRemainingTime();
        targetNode._objectTouching.shaderProgram = cc.shaderCache.getProgram("ShaderPositionTextureColor_noMVP");
        targetNode._objectTouching.runAction(cc.sequence(
            cc.EaseBounceInOut(cc.scaleTo(0.2, 0.7)),
            cc.EaseBounceInOut(cc.scaleTo(0.2, 1))
            ));
        targetNode.handleObjectCorrectPos(index);
        targetNode.runSparklesEffect();
        targetNode._removeWarnLabel();
        cc.audioEngine.playEffect(res.DROP_mp3);

        return true;
    },

    processGameLogic: function() {
        this._removeWarnLabel();

        this._objectTouching.stopAllActions();
        this.removeObjectAction();
        this._lastClickTime = this._hudLayer.getRemainingTime();
        this.playObjectSound(true);

        this._objectTouching.shaderProgram = cc.shaderCache.getProgram("SpriteDistort");

        //set shadeObject to visible
        var index = this.getObjectIndex(this._objectTouching);
        this._shadeObjects[index].visible = true;
        this.highLightObjectCorrectPos(index);

    },

    runObjectAction: function(object, delayTime, func) {
        object.runAction(cc.sequence(
            cc.delayTime(delayTime),
            cc.callFunc(func)
        ));
    },

    highLightObjectCorrectPos: function(index) {
        var shadeObject = this._shadeObjects[index];
        shadeObject.shaderProgram = cc.shaderCache.getProgram("SolidColor");
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
            this._objectDisableds.push(this._objectTouching);
            this.removeObjectAction();
            this.playObjectSound(false);
            this.updateProgressBar();
        }
        this._objectTouching = null;
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
        if (!isDragging) {
            str = objectName;
            var oldZOrder = object.getLocalZOrder();
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
                    if (blockFlag)
                        return;

                    self._blockAllObjects = false;
                    self._removeWarnLabel();

                    mask.removeFromParent();
                    self._mask = null;

                    self.checkWonGame();
                    object.setLocalZOrder(oldZOrder);
                }
            }, mask);
        }

        cc.audioEngine.playEffect(res[objectName.toUpperCase() + "_" + soundNumb + "_mp3"]);

        object.runAction(cc.sequence(
            cc.callFunc(function() {
                self._blockAllObjects = true;
                self.createWarnLabel(str);
            }),
            cc.delayTime(soundConfig.length + 0.5),
            cc.callFunc(function() {
                blockFlag = false;
            })
        ));
    },

    updateProgressBar: function() {
        var percent = this._objectDisableds.length / NUMBER_ITEMS;
        this._hudLayer.setProgressBarPercentage(percent);
        this._hudLayer.setProgressLabelStr(this._objectDisableds.length);

        var starEarned = 0;
        var objectCorrected = this._objectDisableds.length;

        if (objectCorrected >= STAR_GOAL_1 && objectCorrected < STAR_GOAL_2)
            starEarned = 1;
        if (objectCorrected >= STAR_GOAL_2 && objectCorrected < STAR_GOAL_3)
            starEarned = 2;
        if (objectCorrected >= STAR_GOAL_3)
            starEarned = 3;

        // cc.log("starEarned: " + starEarned);
        this._hudLayer.setStarEarned(starEarned);

        if (starEarned > 0)
            this._hudLayer.addStar("light", starEarned);
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

                this._objects[i].runAction(                               
                                        cc.sequence(
                                            cc.scaleTo(0.3, 0.8 * this._allScale),
                                            cc.scaleTo(0.3, 1.2 * this._allScale),
                                            cc.scaleTo(0.3, 0.8 * this._allScale),
                                            cc.scaleTo(0.3, 1.2 * this._allScale),
                                            cc.scaleTo(0.3, 1 * this._allScale),
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
});

var RoomScene = cc.Scene.extend({
    ctor: function() {
        this._super();

        var roomLayer = new RoomLayer();
        this.addChild(roomLayer);
    }
});