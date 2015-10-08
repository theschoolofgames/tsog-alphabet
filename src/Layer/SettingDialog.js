var SettingDialog = cc.Layer.extend({
    _dialogBg: null,
    _mask: null,
    _userName: null,
    _schoolName: null,

    ctor: function() {
        this._super();

        this._userName = Utils.getUserName();
        this._schoolName = Utils.getSchoolName();

        this._addMask();
        this._addDialogBg();
        this._addAccountNameHolder();
        this._addResumeButton();
        this._addLogoutButton();

        cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: this.onTouchBegan,
                onTouchMoved: this.onTouchMoved,
                onTouchEnded: this.onTouchEnded
        }, this);
    },

    _addMask: function() {
        var mask = new cc.LayerColor(cc.color(0, 0, 0 , 200));
        mask.width = cc.winSize.width;
        mask.height = cc.winSize.height;
        this.addChild(mask);

        this._mask = mask;
    },

    _addDialogBg: function() {
        var dialogBg = new cc.Sprite("#setting-dialog-bg.png");
        dialogBg.x = cc.winSize.width/2;
        dialogBg.y = cc.winSize.height/2;
        this.addChild(dialogBg);
        this._dialogBg = dialogBg;

        this._addSchoolNameLabel();
    },

    _addAccountNameHolder: function() {
        var nameHolder = new cc.Sprite("#name-holder.png");
        nameHolder.x = this._dialogBg.width/2;
        nameHolder.y = this._dialogBg.height/2 - nameHolder.height * 2;
        this._dialogBg.addChild(nameHolder);

        var userName = new cc.LabelTTF(this._userName, "Arial", 24);
        userName.color = cc.color.WHITE;
        userName.x = nameHolder.width/2;
        userName.y = nameHolder.height/2;
        nameHolder.addChild(userName);
    },

    _addLogoutButton: function() {
        var logoutBtn = new ccui.Button();
        logoutBtn.loadTextures("btn_exit.png", "btn_exit-pressed.png", "", ccui.Widget.PLIST_TEXTURE);
        logoutBtn.x = this._dialogBg.width/2 - logoutBtn.width/2 - 10;
        logoutBtn.y = 20;
        this._dialogBg.addChild(logoutBtn);

        logoutBtn.addClickEventListener(function() {
            KVDatabase.getInstance().remove(STRING_USER_ID);
            cc.director.replaceScene(new MainScreenScene());
        })
    },

    _addResumeButton: function() {
        var resumeBtn = new ccui.Button();
        resumeBtn.loadTextures("btn_play.png", "btn_play-pressed.png", "", ccui.Widget.PLIST_TEXTURE);
        resumeBtn.x = this._dialogBg.width/2 + resumeBtn.width/2 + 10;
        resumeBtn.y = 20;
        this._dialogBg.addChild(resumeBtn);

        var self = this;
        resumeBtn.addClickEventListener(function() {
            self.removeFromParent();
        })
    },

    _addSchoolNameLabel: function() {
        var schoolName = new cc.LabelTTF(this._schoolName, "Arial", 32);
        schoolName.boundingWidth = this._dialogBg.width - 50;
        schoolName.textAlign = cc.TEXT_ALIGNMENT_CENTER;
        schoolName.color = cc.color("#fdc60a");
        schoolName.x = this._dialogBg.width/2;
        schoolName.y = this._dialogBg.height/2;
        this._dialogBg.addChild(schoolName);
    },

    onTouchBegan: function(touch, event) {
        return true;
    }
})