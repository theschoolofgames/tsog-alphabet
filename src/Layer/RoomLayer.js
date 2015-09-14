var RoomLayer = cc.Layer.extend({
    ctor: function() {
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
        this.getRandomPosArray();
    },

    createBackground: function() {
        var bg = new cc.Sprite();
        bg.x = cc.winSize.width / 2;
        bg.y = cc.winSize.height / 2;
        this.addChild(bg);
    },

    getRandomPosArray: function() {
        var randomedArray = [];
        for( var i = 0; i < POSITION_ARRAY.length; i++) {

        }
    }

});

var RoomScene = cc.Scene.extend({
    ctor: function() {
        this._super();

        var roomLayer = new RoomLayer();
        this.addChild(roomLayer);
    }
});