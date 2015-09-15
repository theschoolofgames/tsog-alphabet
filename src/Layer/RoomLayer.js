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

    createObject: function() {
        var randomedPositionArray = shuffle(POSITION_ARRAY);
        var roomObjectButton = null;

        for ( i = 0; i < randomedPositionArray.length; i++ ) {
            var buttonPosition = randomedPositionArray[i];
            var name = buttonPosition.name;
            roomObjectButton = new ccui.Button(res.GrayButton_png,"", "");

            roomObjectButton.setAnchorPoint(buttonPosition.anchorX, buttonPosition.anchorY);

            roomObjectButton.x = buttonPosition.posX;
            roomObjectButton.y = buttonPosition.posY;
            roomObjectButton.setTitleText(name);
            roomObjectButton.setTitleColor(cc.color.RED);
            roomObjectButton.setTitleFontSize(32);
            this.addChild(roomObjectButton);

            roomObjectButton.addClickEventListener(function() {
                cc.log("room object clicked");
            });
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