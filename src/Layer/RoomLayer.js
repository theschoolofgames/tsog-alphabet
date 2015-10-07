var RoomLayer = cc.Layer.extend({
    _objectTouching: null,
    _objects: [],
    _shadeObjects: [],
    _correctedObject: [],
    _objectDisableds: [],
    _warningLabel: null,
    _countDownClock: null,
    _effectLayer: null,
    _lastClickTime: 0,

    ctor: function() {
        cc.log("Dev: " + whoAmI);
        this._super();

        this.resetObjectArrays();
        this.createBackground();
        this.addObjects();
        this.addRefreshButton();
        this.addBackButton();
        this.addCountDownClock();
        this.runHintObjectUp();
        this.addHud();

        cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: this.onTouchBegan,
                onTouchMoved: this.onTouchMoved,
                onTouchEnded: this.onTouchEnded
        }, this);
    },

    addHud: function() {
        var hudLayer = new HudLayer(this);
        hudLayer.x = 0;
        hudLayer.y = cc.winSize.height - 80;
        this.addChild(hudLayer);
    },

    addRefreshButton: function() {
        var refreshButton = new ccui.Button(res.Button_Refresh_png, "", "");
        refreshButton.x = cc.winSize.width - refreshButton.width;
        refreshButton.y = cc.winSize.height - refreshButton.height / 2;
        this.addChild(refreshButton);

        refreshButton.addClickEventListener(function() {
            cc.director.replaceScene(new RoomScene());
        });
    },

    addBackButton: function() {
        var backButton = new ccui.Button(res.Back_Button_png, res.Back_Button_Pressed_png, "");
        backButton.x = cc.winSize.width - backButton.width*3;
        backButton.y = cc.winSize.height - backButton.height / 2;

        this.addChild(backButton);

        backButton.addClickEventListener(function() {
            cc.director.replaceScene(new ForestScene());
        });
    },

    createBackground: function() {
        var background = new cc.Sprite(res.room_jpg);
        var scale = cc.winSize.width / background.width;
        background.setScale(scale);
        background.x = cc.winSize.width / 2;
        background.y = cc.winSize.height / 2;
        this.addChild(background);
    },

    addObjects: function() {
        var dsInstance = DataStore.getInstance();

        var bedroomObjects = dsInstance.getObjects(BEDROOM_ID, NUMBER_ITEMS);
        var shuffledPositionArray = Utils.shuffle(BEDROOM_ITEMS_POSITION);
        var heavyObjectPositions = Utils.shuffle(BEDROOM_HEAVYWEIGHT_ITEMS_POSITION);
        for ( var i = 0; i < NUMBER_ITEMS; i++) {
            if (bedroomObjects[i].type === LIGHT_WEIGHT_ITEM)
                this.addObjectButton(shuffledPositionArray[i], bedroomObjects[i].imagePath, i);
            else
                this.addObjectButton(heavyObjectPositions[i], bedroomObjects[i].imagePath, i);

            this.addObjectShade(bedroomObjects[i], bedroomObjects[i].imagePath);
        }
    },

    addObjectButton: function(objPosition, imagePath, index) {
        var object = new cc.Sprite(imagePath);
        self = this;
        object.setAnchorPoint(objPosition.anchorX, objPosition.anchorY);

        object.x = objPosition.x;
        object.y = objPosition.y;

        this.addChild(object, 2);

        this.animateObjectIn(object, index)
        this._objects.push(object);

        this.runObjectAction(this, 0,
            function(){
                self._lastClickTime = self._countDownClock.getRemainingTime()
            }
        )
    },

    addObjectShade: function(object, imagePath) {
        var shadeObject = new cc.Sprite(imagePath);
        shadeObject.setScale(1.5);
        shadeObject.setAnchorPoint(object.anchorPoint);
        shadeObject.setPosition(object.correctPos);
        shadeObject.visible = false;

        this.addChild(shadeObject, 1);
        this._shadeObjects.push(shadeObject);
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
        for (var i = 0; i < targetNode._objectDisableds.length; i++) {
            if (targetNode._objectTouching === targetNode._objectDisableds[i]){
                targetNode._objectTouching = null;
                return false
            }
        }
        targetNode._objectTouching.stopAllActions();
        targetNode.removeObjectAction();

        targetNode._lastClickTime = targetNode._countDownClock.getRemainingTime();
        var objectPosition = targetNode.getObjectPosWithTouchedPos(touchedPos);
        targetNode._objectTouching.setPosition(objectPosition);

        targetNode._objectTouching.shaderProgram = cc.shaderCache.getProgram("SpriteDistort");

        //set shadeObject to visible
        var index = targetNode.getObjectIndex(targetNode._objectTouching);
        targetNode._shadeObjects[index].visible = true;
        targetNode.highLightObjectCorrectPos(index);

        return true;
    },

    onTouchMoved: function(touch, event) {
        var targetNode = event.getCurrentTarget();
        var touchedPos = touch.getLocation();

        var objectPosition = targetNode.getObjectPosWithTouchedPos(touchedPos);

        targetNode._objectTouching.setPosition(objectPosition);

        return true;
    },

    onTouchEnded: function (touch, event) {
        var targetNode = event.getCurrentTarget();
        //set shadeObject visible to false
        var index = targetNode.getObjectIndex(targetNode._objectTouching);
        targetNode._shadeObjects[index].visible = false;

        targetNode._objectTouching.shaderProgram = cc.shaderCache.getProgram("ShaderPositionTextureColor_noMVP");

        targetNode.handleObjectCorrectPos(index);
        // targetNode._warningLabel.removeFromParent();
        targetNode._objectTouching = null;

        // win condition
        if (targetNode._objectDisableds.length == NUMBER_ITEMS)
            targetNode.completedScene()

        return true;
    },

    completedScene: function() {
        this.createWarnLabel("Scene Completed!");
        RequestsManager.getInstance().postGameProgress(Utils.getUserId(), GAME_ID, 3, this._countDownClock.getElapseTime());
        this.runObjectAction(this, CHANGE_SCENE_TIME, function() {
                    cc.director.replaceScene(new ForestScene());
                });
    },

    runObjectAction: function(object, delayTime, func) {
        object.runAction(cc.sequence(
            cc.delayTime(delayTime),
            cc.callFunc(func)
        ));
    },

    resetObjectArrays: function() {
        this._objectPositions = [];
        this._objects = [];
        this._shadeObjects = [];
        this._correctedObject = [];
        this._objectDisableds = [];
    },

    highLightObjectCorrectPos: function(index) {
        var shadeObject = this._shadeObjects[index];
        shadeObject.runAction(
            cc.repeatForever(
                    cc.sequence(
                        cc.scaleTo(0.8, 0.8),
                        cc.scaleTo(0.8, 1.2)
            )));
    },

    handleObjectCorrectPos: function(index) {
        if (!this._objectTouching)
            return;
        var objectPos = this._objectTouching.getPosition();
        var shadePos = this._shadeObjects[index].getPosition();
        var distance = cc.pDistance(objectPos, shadePos);

        if (distance < 100) {
            this._objectTouching.setPosition(shadePos);
            this._objectTouching.setLocalZOrder(0);
            this._objectDisableds.push(this._objectTouching);
        }
    },

    addCountDownClock: function() {
        var self = this;
        this._countDownClock = new Clock(300, function(){self.completedScene()});
        this._countDownClock.x = cc.winSize.width / 2 - 10;
        this._countDownClock.y = cc.winSize.height - 20;
        this.addChild(this._countDownClock);
    },

    getObjectPosWithTouchedPos: function(touchedPos) {
        var objectAnchorPoint = this._objectTouching.getAnchorPoint();
        var objectSize = this._objectTouching.getContentSize();

        var objectPosDistance = cc.p(objectSize.width*(1 - objectAnchorPoint.x),
                                    objectSize.height/2*(0.5 - objectAnchorPoint.y));

        var objectPosition = cc.pAdd(touchedPos, objectPosDistance);

        return objectPosition;
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
                cc.scaleTo(0.7, 1).easing(cc.easeElasticOut(0.9))
            )
        );

        this.runObjectAction(this, 0,
            function(){
                self._lastClickTime = self._countDownClock.getRemainingTime()
            }
        )
    },

    runHintObjectUp: function() {
        this.schedule(this.showHintObjectUp, CLOCK_INTERVAL, this._countDownClock.getRemainingTime());
    },

    showHintObjectUp: function() {
        var deltaTime = this._lastClickTime - this._countDownClock.getRemainingTime();
        if(deltaTime == TIME_HINT) {
            if (this._objects.length > 0) {
                var i = Math.floor(Math.random() * (this._objects.length - 1));
                this._effectLayer = new EffectLayer(this._objects[i], "sparkles", SPARKLE_EFFECT_DELAY, SPARKLE_EFFECT_FRAMES, true);
            };
        }
    },

    removeObjectAction: function() {
        if (this._effectLayer)
            this._effectLayer.stopRepeatAction();
        this._effectLayer = null;
    }
});

var RoomScene = cc.Scene.extend({
    ctor: function() {
        this._super();

        var roomLayer = new RoomLayer();
        this.addChild(roomLayer);
    }
});