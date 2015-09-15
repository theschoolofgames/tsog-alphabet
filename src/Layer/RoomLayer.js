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
    },

    createBackground: function() {
        var background = new cc.Sprite(res.room_jpg);
        var scale = cc.winSize.width / background.width;
        background.setScale(scale);
        background.x = cc.winSize.width / 2;
        background.y = cc.winSize.height / 2;
        this.addChild(background);
    },

    createObject: function(numberOfObject) {
        var dsInstance = DataStore.getInstance();
        var randomedObjectArray = dsInstance.getRandomObjects(BEDROOM_ID, NUMBER_ITEMS);
        var randomedPositionArray = dsInstance.getRandomPositions(BEDROOM_ID, NUMBER_ITEMS);
        var objectButton = null;

        for ( i = 0; i < NUMBER_ITEMS; i++)
            this.createObjectButton(randomedPositionArray[i], randomedObjectArray[i]);
    },

    createObjectButton: function(buttonPosition, imagePath) {
        var objectButton = new ccui.Button(res.GrayButton_png,"", "");

        objectButton.setAnchorPoint(buttonPosition.anchorX, buttonPosition.anchorY);

        objectButton.x = buttonPosition.x;
        objectButton.y = buttonPosition.y;

        this.addChild(objectButton);

        objectButton.addClickEventListener(function() {
            cc.log("room object clicked");
        });
    },

    createObjectButtonPlaceHolder: function(buttonPosition) {
        // var objButtonPlaceHolderPos = BUTTON_PLACEHOLDER_POSITION[buttonPosition.placeHolderId];

    }

});

var RoomScene = cc.Scene.extend({
    ctor: function() {
        this._super();

        var roomLayer = new RoomLayer();
        this.addChild(roomLayer);
    }
});