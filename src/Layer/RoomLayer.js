var RoomLayer = cc.Layer.extend({
    _objectTouching: null,
    _objects: [],
    _shadeObjects: [],
    _correctedObject: [],
    _objectDisabled: [],
    _warningLabel: null,

    ctor: function() {
        cc.log("Dev: " + whoAmI);
        this._super();

        this.resetObjectArrays();
        this.createBackground();
        this.createObject();
        this.addRefreshButton();
        this.addBackButton();
        this.addCountDownClock(),
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
        // get randomed arrays with BEDROOM_ID
        var randomedObjectArray = dsInstance.getRandomObjects(BEDROOM_ID, NUMBER_ITEMS);
        var randomedPositionArray = dsInstance.getRandomPositions(BEDROOM_ID, NUMBER_ITEMS);
        // get randomed arrays with BEDROOM_SHADE
        var randomedShadeObjectArray = dsInstance.getRandomObjects(BEDROOM_SHADE_ID, NUMBER_ITEMS);
        var randomedShadePositionArray = dsInstance.getRandomPositions(BEDROOM_SHADE_ID, NUMBER_ITEMS);

        for ( var i = 0; i < NUMBER_ITEMS; i++) {
            this.createObjectShade(randomedShadePositionArray[i], randomedShadeObjectArray[i]);
            this.createObjectButton(randomedPositionArray[i], randomedObjectArray[i], randomedShadePositionArray[i]);
        }
    },

    createObjectButton: function(objPosition, imgPath, shadePos) {
        var object = new cc.Sprite(res.GrayButton_png);

        object.setAnchorPoint(objPosition.anchorX, objPosition.anchorY);

        object.x = objPosition.x;
        object.y = objPosition.y;

        this.addChild(object, 1);

        /*  _objectPositions là mảng gồm position của object và placeHolder tương ứng
            */
        this._objects.push(object);
    },

    createObjectShade: function(shadePosition, imagePath) {
        var shadeObject = new cc.Sprite(res.Red_PlaceHolder_jpg);
        shadeObject.setScale(1.5);
        shadeObject.setAnchorPoint(shadePosition.anchorX, shadePosition.anchorY);

        shadeObject.x = shadePosition.x;
        shadeObject.y = shadePosition.y;
        shadeObject.visible = false;

        this.addChild(shadeObject, 0);
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
        // disable multitouching
        if (targetNode._objectTouching)
            return false;
        if (!targetNode._isTouchingObject(touchedPos))
            return false;
        // return if the objectTouching is disabled
        for (var i = 0; i < targetNode._objectDisabled.length; i++) {
            if (targetNode._objectTouching === targetNode._objectDisabled[i])
                return false
        }
        var objectPosition = targetNode.getObjectPosWithTouchedPos(touchedPos);
        targetNode._objectTouching.setPosition(objectPosition);

        //set shadeObject to visible
        var index = targetNode.getObjectIndex(targetNode._objectTouching);
        targetNode._shadeObjects[index].visible = true;
        targetNode.highLightObjectCorrectPos(index);
        targetNode.createWarnLabel("Object is moving!", targetNode._objectTouching);

        return true;
    },

    onTouchMoved: function(touch, event) {
        var targetNode = event.getCurrentTarget();
        var touchedPos = touch.getLocation();

        var objectPosition = targetNode.getObjectPosWithTouchedPos(touchedPos);

        targetNode._objectTouching.setPosition(objectPosition);
        targetNode._warningLabel.setPosition(cc.p(touchedPos.x, touchedPos.y + targetNode._objectTouching.height + 10));

        return true;
    },

    onTouchEnded: function (touch, event) {
        var targetNode = event.getCurrentTarget();
        //set shadeObject visible to false
        var index = targetNode.getObjectIndex(targetNode._objectTouching);
        targetNode._shadeObjects[index].visible = false;

        targetNode.handleObjectCorrectPos(index);
        targetNode._warningLabel.removeFromParent();
        targetNode._objectTouching = null;

        // win condition
        if (targetNode._objectDisabled.length == 6)
            targetNode.completedScene()

        return true;
    },

    completedScene: function() {
        this.createWarnLabel("Scene Completed!");
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
        this._objectDisabled = [];
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
            this._objectTouching.setPosition(shadePos)
            this._objectDisabled.push(this._objectTouching);
        }
    },

    addCountDownClock: function() {
        var self = this;
        var countDownClock = new Clock(300, function(){self.completedScene()});
        countDownClock.x = cc.winSize.width / 2 - 10;
        countDownClock.y = cc.winSize.height - 20;
        this.addChild(countDownClock);
    },

    getObjectPosWithTouchedPos: function(touchedPos) {
        var objectAnchorPoint = this._objectTouching.getAnchorPoint();
        var objectSize = this._objectTouching.getContentSize();
        var anchorPointXRatio = (objectAnchorPoint.x <= 0.5) ? 1 : -1;
        var anchorPointYRatio = (objectAnchorPoint.y <= 0.5) ? 1 : -1;
        cc.log("anchorPointXRatio" + JSON.stringify(anchorPointXRatio));
        cc.log("anchorPointYRatio" + JSON.stringify(anchorPointYRatio));

        var objectPosDistance = cc.p(objectSize.width*(0.5 - objectAnchorPoint.x)*anchorPointXRatio,
                                    objectSize.height*(0.5 - objectAnchorPoint.y)*anchorPointYRatio);
        var objectPosition = cc.pAdd(touchedPos, objectPosDistance);
        cc.log("objectPosition" + JSON.stringify(objectPosition));
        cc.log("touchedPos" + JSON.stringify(touchedPos));
        cc.log("objectAnchorPoint: " + JSON.stringify(objectAnchorPoint));
        return objectPosition;
    }

});

var RoomScene = cc.Scene.extend({
    ctor: function() {
        this._super();

        var roomLayer = new RoomLayer();
        this.addChild(roomLayer);
    }
});