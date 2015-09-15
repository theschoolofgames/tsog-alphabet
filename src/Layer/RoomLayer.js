var RoomLayer = cc.Layer.extend({
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

        this.createBackground();
        this.createObject();
        this.addRefreshButton();
        this.addBackButton();
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
            this.createObjectPlaceHolder(randomedShadePositionArray[i], randomedShadeObjectArray[i]);
            this.createObjectButton(randomedPositionArray[i], randomedObjectArray[i]);
        }
    },

    createObjectButton: function(buttonPosition, imagePath) {
        var objectButton = new ccui.Button(res.GrayButton_png,"", "");

        objectButton.setAnchorPoint(buttonPosition.anchorX, buttonPosition.anchorY);

        objectButton.x = buttonPosition.x;
        objectButton.y = buttonPosition.y;

        this.addChild(objectButton, 1);

        objectButton.addClickEventListener(function() {

        });
    },

    createObjectPlaceHolder: function(placeHolderPosition, imagePath) {
        var shadeObject = new cc.Sprite(res.Red_PlaceHolder_jpg);

        shadeObject.setAnchorPoint(placeHolderPosition.anchorX, placeHolderPosition.anchorY);

        shadeObject.x = placeHolderPosition.x;
        shadeObject.y = placeHolderPosition.y;

        this.addChild(shadeObject, 0);
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

});

var RoomScene = cc.Scene.extend({
    ctor: function() {
        this._super();

        var roomLayer = new RoomLayer();
        this.addChild(roomLayer);
    }
});