var RoomLayer = cc.Layer.extend({
    _objectTouching: null,
    _objectPositions: [],
    _objects: [],
    _shadeObjects: [],

    ctor: function() {
        cc.log("Dev: " + whoAmI);
        /*
            create background
                function() {
                    add background...
                }
            random position
                use shuffle function

            create object with random position
                function() {
                    var randomedPositionArray = randomPosition function();
                    --> create object

                    onObjectClicked() {
                        tap and hold on an object to see its correct position
                        highlight correct position
                    }
                }

            dragFunction() {
                drag to correct position ???
                animation and sound while dragging
            }
            auto snap
            win condition
        */
        this._super();

        this.resetObjectArrays();
        this.createBackground();
        this.createObject();
        this.addRefreshButton();
        this.addBackButton();

        cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: this.onTouchBegan,
                onTouchMoved: this.onTouchMoved,
                onTouchEnded: this.onTouchEnded
        }, this);
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

        this._objectPositions.push({
            objectPos: objPosition,
            shadePos: shadePos
        });
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

    _isTouchingObject: function(touchedPos) {
        // nếu vị trí bấm vào nằm trong object thì gán object đó vào _objectTouching để sử dụng
        var distance = 0;
        var objBoundingBox = null;
        for ( var i = 0; i < this._objects.length; i++) {
            objBoundingBox = this._objects[i].getBoundingBox();
            // cc.log("objBoundingBox: " + JSON.stringify(objBoundingBox));
            distance = cc.pDistance(touchedPos, cc.p(objBoundingBox.x + objBoundingBox.width/2,
                                                    objBoundingBox.y + objBoundingBox.height/2));
            // cc.log("distance: " + distance);
            if (distance < objBoundingBox.width/2) {
                // cc.log("distance true: " + distance);
                // cc.log("bbox.width: " +objBoundingBox.width);
                this._objectTouching = this._objects[i];
                return true;
            }
        }
        cc.log("--------------------");

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

        targetNode._objectTouching.setPosition(touchedPos);

        //set shadeObject to visible
        var index = targetNode.getObjectIndex(targetNode._objectTouching);
        targetNode._shadeObjects[index].visible = true;
        targetNode.highLightObjectCorrectPos(index);

        return true;
    },

    onTouchMoved: function(touch, event) {
        var targetNode = event.getCurrentTarget();
        var touchedPos = touch.getLocation();

        targetNode._objectTouching.setPosition(touchedPos);
        // cc.log("touchedPos: " + JSON.stringify(touchedPos));
        // cc.log("object pos: " + JSON.stringify(targetNode._objectTouching.getPosition()));

        return true;
    },

    onTouchEnded: function (touch, event) {
        var targetNode = event.getCurrentTarget();
        //set shadeObject visible to false
        var index = targetNode.getObjectIndex(targetNode._objectTouching);
        targetNode._shadeObjects[index].visible = false;
        targetNode.handleObjectCorrectPos(index);

        targetNode._objectTouching = null;

        return true;
    },

    resetObjectArrays: function() {
        this._objectPositions = [];
        this._objects = [];
        this._shadeObjects = [];
    },

    highLightObjectCorrectPos: function(index) {
        var shadeObject = this._shadeObjects[index];
        shadeObject.runAction(
            cc.repeatForever(
                    cc.sequence(
                        // cc.scaleTo(0.4, 1).easing(cc.easeElasticOut(0.6))
                        cc.scaleTo(0.8, 0.8),
                        cc.scaleTo(0.8, 1.2)
            )));
    },

    handleObjectCorrectPos: function(index) {
        // var objectPos = this._objectTouching.getPosition();
        // var shadePos = this._shadeObjects[index].getPosition();
        // var distance = cc.pDistance(objectPos, shadePos);

        // if (distance < )
    }
});

var RoomScene = cc.Scene.extend({
    ctor: function() {
        this._super();

        var roomLayer = new RoomLayer();
        this.addChild(roomLayer);
    }
});