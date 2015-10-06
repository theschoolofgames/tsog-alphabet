var RoomLayer = cc.Layer.extend({
    _objectTouching: null,
    _objects: [],
    _shadeObjects: [],
    _correctedObject: [],
    _objectDisableds: [],
    _warningLabel: null,
    _countDownClock: null,
    _lastClickTime: 0,

    ctor: function() {
        cc.log("Dev: " + whoAmI);
        this._super();

        // cc.spriteFrameCache.addSpriteFrames(res.Forest_plist);
        // cc.spriteFrameCache.addSpriteFrames(res.Animals_plist);
        // cc.spriteFrameCache.addSpriteFrames(res.Things_plist);

        this.resetObjectArrays();
        this.createBackground();
        this.createObject();
        this.addRefreshButton();
        this.addBackButton();
        this.addCountDownClock();
        this.runHintObjectUp();
        cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: this.onTouchBegan,
                onTouchMoved: this.onTouchMoved,
                onTouchEnded: this.onTouchEnded
        }, this);
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
        backButton.x = backButton.width;
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

    createObject: function() {
        var dsInstance = DataStore.getInstance();

        var bedroomObjects = dsInstance.getObjects(BEDROOM_ID, NUMBER_ITEMS);
        var shuffledPositionArray = Utils.shuffle(BEDROOM_ITEMS_POSITION);
        var heavyObjectPositions = Utils.shuffle(BEDROOM_HEAVYWEIGHT_ITEMS_POSITION);
        for ( var i = 0; i < NUMBER_ITEMS; i++) {
            if (bedroomObjects[i].type === LIGHT_WEIGHT_ITEM)
                this.createObjectButton(shuffledPositionArray[i], bedroomObjects[i].imagePath);
            else
                this.createObjectButton(heavyObjectPositions[i], bedroomObjects[i].imagePath);

            this.createObjectShade(bedroomObjects[i], bedroomObjects[i].imagePath);
        }
    },

    createObjectButton: function(objPosition, imagePath) {
        var object = new cc.Sprite(imagePath);
        self = this;
        object.setAnchorPoint(objPosition.anchorX, objPosition.anchorY);

        object.x = objPosition.x;
        object.y = objPosition.y;

        this.addChild(object, 2);

        /*  _objectPositions là mảng gồm position của object và placeHolder tương ứng
            */
        this._objects.push(object);

        this.runObjectAction(this, 0, 
            function(){
                self._lastClickTime = self._countDownClock.getRemainingTime()
            }
        )
    },
    

    createObjectShade: function(object, imagePath) {
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
        // targetNode.createWarnLabel("Object is moving!", targetNode._objectTouching);

        return true;
    },

    onTouchMoved: function(touch, event) {
        var targetNode = event.getCurrentTarget();
        var touchedPos = touch.getLocation();

        var objectPosition = targetNode.getObjectPosWithTouchedPos(touchedPos);

        targetNode._objectTouching.setPosition(objectPosition);
        // targetNode._warningLabel.setPosition(objectPosition);

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
                                    objectSize.height*(1 - objectAnchorPoint.y));

        var objectPosition = cc.pAdd(touchedPos, objectPosDistance);

        return objectPosition;
    },

    animateObjectIn: function(object, delay) {
        object.scale = 0;
        var type = object.type;
        var self = this;
        object.runAction(
            cc.sequence(
                cc.delayTime(delay * 0.5),
                // cc.callFunc(function() {
                //     self.addSmokeEffect(object);
                // }),
                // cc.delayTime(0),
                cc.scaleTo(0.3, 1).easing(cc.easeElasticOut(0.6))
            )
        );
        this.runAnimalAction(object, type);

        this.runObjectAction(this, 0,
            function(){
                self._lastClickTime = self._countDownClock.getRemainingTime()
            }
        )
    },

    runHintObjectUp: function() {
        this.schedule(this.showHintObjectUp, CLOCK_INTERVAL, this._countDownClock.getRemainingTime());
    },
    

    runHintAction: function() {
        var animalAction =  cc.repeatForever(cc.sequence(
                                            cc.scaleTo(0.8, 1.1),
                                            cc.scaleTo(0.8, 0.9),
                                            cc.scaleTo(0.8, 1)
                                        ))
        animalAction.tag = 1;
        return animalAction;
    },
    showHintObjectUp: function() {
        var deltaTime = this._lastClickTime - this._countDownClock.getRemainingTime();
        if(deltaTime == TIME_HINT) {
            if (this._objects.length > 0) {
                var i = Math.floor(Math.random() * (this._objects.length - 1));
                cc.log(i);
                this._objects[i].runAction(this.runHintAction())
            };
        }
    },

    removeObjectAction: function() {
        for ( var i = 0; i < this._objects.length; i++) {
            this._objects[i].stopActionByTag(1);
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