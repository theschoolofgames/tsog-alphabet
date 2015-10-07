var SettingDialog = cc.Layer.extend({
    _dialogBg: null,

    ctor: function() {
        this._super();

        this._addMask();

        cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: this.onTouchBegan,
                onTouchMoved: this.onTouchMoved,
                onTouchEnded: this.onTouchEnded
        }, this);
    },

    _addMask: function() {
        var mask = new cc.LayerColor(cc.color(0, 0, 0 , 100));
        mask.width = cc.winSize.width;
        mask.height = cc.winSize.height;
        this.addChild(mask);
    },

    _addDialogBg: function() {
        var dialogBg = new cc.Sprite("#BG.png");
        dialogBg.x = cc.winSize.width/2;
        dialogBg.y = cc.winSize.height/2;
        this.addChild(dialogBg);
        this._dialogBg = dialogBg;
    },

    _addResumeButton: function() {
        var nameHolder = new cc.Sprite("#name-holder.png");
        nameHolder.x = this._dialogBg.width/2;
        nameHolder.y = this._dialogBg.height/2 - 20;
        this._dialogBg.addChild(nameHolder);
    },

    _addLogoutButton: function() {
        var logoutBtn = new ccui.Button();
        logoutBtn.loadTextures("btn_exit.png", "btn_exit-pressed.png", "", ccui.Widget.PLIST_TEXTURE);
        logoutBtn.x = this._dialogBg.width/2 - logoutBtn.width/2;
        logoutBtn.y = 0;
        this._dialogBg.addChild(logoutBtn);
    },

    _addResumeButton: function() {
        var resumeBtn = new ccui.Button();
        resumeBtn.loadTextures("btn_play.png.png", "btn_play.png-pressed.png", "", ccui.Widget.PLIST_TEXTURE);
        resumeBtn.x = this._dialogBg.width/2 - resumeBtn.width/2;
        resumeBtn.y = 0;
        this._dialogBg.addChild(resumeBtn);
    },

    onTouchBegan: function(touch, event) {
        var targetNode = event.getCurrentTarget();

        targetNode.removeFromParent();
        return true;
    }
})