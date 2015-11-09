var MainScreenLayer = cc.LayerColor.extend({

    _eventMainAppCall: null,
    _lbWelcome: null,

    ctor: function() {
        this._super(cc.color(255, 255, 255, 255));

        // var progressBar = new cc.Sprite(res.Hud_progress_bar_png);
        // progressBar.x = cc.winSize.width/2;
        // progressBar.y = cc.winSize.height - 30;
        // this.addChild(progressBar);

        // var mask = cc.textureCache.getTextureForKey(res.Hud_progress_bar_alpha_png);
        // if (!mask)
        //     mask = cc.textureCache.addImage(res.Hud_progress_bar_alpha_png);
        // var shaderScrolling = cc.GLProgram.createWithFilenames(res.PositionTextureColor_noMVP_vsh, res.ScrollingTexture_fsh);
        // var shaderScrollingState = cc.GLProgramState.getOrCreateWithGLProgram(shaderScrolling);
        // shaderScrollingState.setUniformTexture("u_alphaTexture", mask);
        // progressBar.shaderProgram = shaderScrolling;

        var logo = new cc.Sprite("logo.png");
        logo.x = cc.winSize.width/2;
        logo.y = cc.winSize.height/2 + 50;
        this.addChild(logo);

        var lbContinue = new cc.LabelTTF("TOUCH TO CONTINUE", "Arial", 36);
        lbContinue.x = cc.winSize.width/2;
        lbContinue.y = cc.winSize.height/2 - 250;
        lbContinue.color = cc.color(0, 0, 0, 255);
        this.addChild(lbContinue);

        this._lbWelcome = new cc.LabelTTF("Please login from TSOG main app", "Arial", 28);
        this._lbWelcome.x = cc.winSize.width/2;
        this._lbWelcome.y = cc.winSize.height/2 - 150;
        this._lbWelcome.color = cc.color(0, 0, 0, 255);
        this._lbWelcome.textAlign = cc.TEXT_ALIGNMENT_CENTER;
        this.addChild(this._lbWelcome);
        
        var userId = Utils.getUserId();
        if (userId) {
            var userName = Utils.getUserName();
            var schoolName = Utils.getSchoolName();

            this._lbWelcome.string = cc.formatStr("Welcome %s\nfrom %s", userName, schoolName);
        }

        lbContinue.runAction(cc.repeatForever(cc.sequence(
            cc.fadeOut(0.75),
            cc.fadeIn(0.75))));

        cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: function(touch, event) {
                    var userId = Utils.getUserId();
                    if (!userId || userId === "")
                        NativeHelper.callNative("moveToMainApp");
                    else
                        cc.director.replaceScene(new RoomScene());
                    return true;
                }
        }, this);

        // this.downloadAssets();
    },

    onEnter: function() {
        this._super();
        var self = this;
        this._eventMainAppCall = cc.eventManager.addCustomListener(STRING_EVENT_MAIN_APP_CALLED, function (event) {
            var data = event.getUserData();
            self._lbWelcome.string = cc.formatStr("Welcome %s\nfrom %s", data.user_name, data.school_name);
        });
    },

    onExit: function() {
        cc.eventManager.removeListener(this._eventMainAppCall);
        this._eventMainAppCall = null;
        this._super();
    },

    downloadAssets: function() {
        var manifestPath = Utils.useHDAssets ? "projectHD.manifest" : "projectSD.manifest";
        var manager = new jsb.AssetsManager(manifestPath, Utils.getAssetsManagerPath());

        cc.log("Storage path for this test : " + Utils.getAssetsManagerPath());

        manager.retain();

        if (!manager.getLocalManifest().isLoaded()) {
            cc.log("Fail to update assets, step skipped.");
        }
        else {
            var listener = new jsb.EventListenerAssetsManager(manager, function(event) {
                switch (event.getEventCode())
                {
                    case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                        cc.log("No local manifest file found, skip assets update.");
                        break;
                    case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                        var percent = event.getPercent();
                        var filePercent = event.getPercentByFile();
                        cc.log("Download percent : " + percent + " | File percent : " + filePercent);
                        break;
                    case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
                    case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                        cc.log("Fail to download manifest file, update skipped.");
                        break;
                    case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                    case jsb.EventAssetsManager.UPDATE_FINISHED:
                        cc.log("Update finished.");

                        ConfigStore.setupInstance();
                        // You need to release the assets manager while you are sure you don't need it any more
                        ConfigStore.setupInstance();
                        manager.release();
                        break;
                    case jsb.EventAssetsManager.UPDATE_FAILED:
                        cc.log("Update failed. " + event.getMessage());
                        // Directly update previously failed assets, we suggest you to count and abort after several retry.
                        manager.downloadFailedAssets();
                        break;
                    case jsb.EventAssetsManager.ERROR_UPDATING:
                        cc.log("Asset update error: " + event.getAssetId() + ", " + event.getMessage());
                        break;
                    case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                        cc.log(event.getMessage());
                        break;
                    default:
                        break;
                }
            });

            cc.eventManager.addListener(listener, 1);
            manager.update();
        }
    }
});

var MainScreenScene = cc.Scene.extend({
    ctor: function() {
        this._super();

        var layer = new MainScreenLayer();
        this.addChild(layer);
    }
});