var MainScreenLayer = cc.LayerColor.extend({

    ctor: function() {
        this._super(cc.color(255, 255, 255, 255));

        var logo = new cc.Sprite("logo.png");
        logo.x = cc.winSize.width/2;
        logo.y = cc.winSize.height/2;
        this.addChild(logo);

        var lb = new cc.LabelTTF("TOUCH TO CONTINUE", "Arial", 36);
        lb.x = cc.winSize.width/2;
        lb.y = cc.winSize.height/2 - 200;
        lb.color = cc.color(0, 0, 0, 255);
        this.addChild(lb);

        lb.runAction(cc.repeatForever(cc.sequence(
            cc.fadeOut(0.75),
            cc.fadeIn(0.75))));

        cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: function(touch, event) {
                    var userId = Utils.getUserId();
                    if (!userId || userId === "")
                        Utils.moveToMainApp();
                    else
                        cc.director.replaceScene(new RoomScene());
                    return true;
                }
        }, this);

        // Add Shader to cache
        var shaderSpriteDistort = cc.GLProgram.createWithFilenames(res.SpriteDistort_vsh, res.SpriteDistort_fsh);
        cc.shaderCache.addProgram(shaderSpriteDistort, "SpriteDistort");
    },
});

var MainScreenScene = cc.Scene.extend({
    ctor: function() {
        this._super();

        var layer = new MainScreenLayer();
        this.addChild(layer);
    }
});