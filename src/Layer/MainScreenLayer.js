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

        this.downloadAssets();
    },

    downloadAssets: function() {
        var manifestPath = "project.manifest";
        var storagePath = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + "assetsManager/");
        var manager = new jsb.AssetsManager(manifestPath, storagePath);

        cc.log("Storage path for this test : " + storagePath);

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
                        // You need to release the assets manager while you are sure you don't need it any more
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