var ForestLayer = cc.Layer.extend({
    _disabledButtons: [],
    _objects: [],
    _objectDisabled: [],

    _touchCounting: 0,
    _warningLabel: null,
    _warningLabel : null,
    _objectTouching: null,

	ctor: function() {
		this._super();

        this.resetObjectArrays();
		this.createBackground();
		this.createAnimals();
        this.addBackButton();
        this.addRefreshButton();

		cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan
        }, this);
	},

	createBackground: function() {
		var backGround = new cc.Sprite(res.forest_jpg);
		var scale = cc.winSize.width / backGround.width;
		backGround.setScale(scale);
		backGround.x = cc.winSize.width/2;
		backGround.y = cc.winSize.height/2;
		this.addChild(backGround);
	},

	createAnimals: function() {
 		var dsInstance = DataStore.getInstance();
 		var randomedAnimalArray = dsInstance.getRandomObjects(FOREST_ID, NUMBER_ITEMS);
 		var randomedPositionArray = dsInstance.getRandomPositions(FOREST_ID, NUMBER_ITEMS);

 		for (i = 0; i < NUMBER_ITEMS; i++)
 			this.createAnimal(randomedPositionArray[i], randomedAnimalArray[i], i);

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
        if (targetNode._warningLabel)
        	targetNode._warningLabel.removeFromParent();

    	targetNode.createWarnLabel("animallll", targetNode._objectTouching);

        if (targetNode._touchCounting == 6){
        	targetNode.runObjectAction(targetNode._warningLabel, CHANGE_SCENE_TIME, function(){
        		targetNode.completedScene()
        	});
        }
        targetNode._objectDisabled.push(targetNode._objectTouching);

        return true;
    },

    createAnimal : function(Position, imagePath, i) {
    	var animal =  new cc.Sprite(res.GrayButton_png,"", "");
    	animal.scale = 0;
    	animal.setAnchorPoint(Position.anchorX, Position.anchorY);

    	animal.x = Position.x;
    	animal.y =  Position.y;
    	animal.runAction(
            cc.sequence(
                cc.delayTime(i*0.1),
                cc.scaleTo(0.5, 1).easing(cc.easeElasticOut(0.6))
            ));
    	this.addChild(animal);
    	this._objects.push(animal);
    },

    resetObjectArrays: function() {
        this._objects = [];
        this._objectDisabled = [];
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

    createWarnLabel: function(text, object) {
    	cc.log("createWarnLabel");
        var warnLabel = new cc.LabelTTF(text, "Arial", 32);
        warnLabel.setColor(cc.color.RED);
        if (object) {
            warnLabel.x = object.x;
            warnLabel.y = object.y;
        }
        else {
            warnLabel.x = cc.winSize.width / 2;
            warnLabel.y = cc.winSize.height - 100;
        }
        this.addChild(warnLabel);

        this._warningLabel = warnLabel;
    },

    completedScene: function() {
        if (this._warningLabel)
            this._warningLabel.removeFromParent()

        this.createWarnLabel("Scene Completed!");
        this.runObjectAction(this, CHANGE_SCENE_TIME, function() {
                    cc.director.replaceScene(new RoomScene());
                });
    },

    runObjectAction: function(object, delayTime, func) {
    	object.runAction(cc.sequence(
    		cc.delayTime(delayTime),
    		cc.callFunc(func)
		));
    }
});
var ForestScene = cc.Scene.extend({
	ctor: function() {
		this._super();

		var forestLayer = new ForestLayer();
		this.addChild(forestLayer);
	}
});
