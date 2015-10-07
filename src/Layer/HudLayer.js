var HudLayer = cc.Layer.extend({
    _layer: null,
    _clock: null,
    _clockImg: null,
    _settingBtn: null,
    _goalImg: null,
    _progressBar: null,
    _progressLabel: null,

    ctor: function() {
        this._super();

        this._layer = cc.director.getRunningScene();
        this.addSettingButton();
        this.addGameProgressBar();
        this.addGoalImage();
        this.addClockImage();

        this.width = this._clockImg.x + this._clockImg.width/2;
        this.height = this._settingBtn.height;
    },

    addSettingButton: function() {
        var settingBtn = new ccui.Button();
        settingBtn.loadTextures("btn_pause.png", "btn_pause-pressed.png", "", ccui.Widget.PLIST_TEXTURE);
        settingBtn.x = settingBtn.width - 10;
        settingBtn.y = settingBtn.height/2 - 10;
        this.addChild(settingBtn);

        var self = this;
        settingBtn.addClickEventListener(function() {
            cc.log("clicking setting")
            cc.director.getRunningScene().addChild(new SettingDialog());
        })
        this._settingBtn = settingBtn;
    },

    addGameProgressBar: function() {
        var progressBarBg = new cc.Sprite("#progress-bar.png");
        progressBarBg.x = this._settingBtn.x + progressBarBg.width/2 + HUD_BAR_DISTANCE;
        progressBarBg.y = this._settingBtn.y;
        this.addChild(progressBarBg);

        this._progressBar = progressBarBg;
        var gameProgressBar = new cc.ProgressTimer(progressBarBg);

        this.addStar(progressBarBg, "dark", (progressBarBg.width - 30)/3, progressBarBg.height/2 + 5);
        this.addStar(progressBarBg, "dark", (progressBarBg.width - 30)/3*2, progressBarBg.height/2 + 5);
        this.addStar(progressBarBg, "dark", progressBarBg.width - 30, progressBarBg.height/2 + 5);
    },

    addGoalImage: function() {
        var goalBg = new cc.Sprite("#whitespace.png");
        goalBg.x = this._progressBar.x + this._progressBar.width/2 + goalBg.width/2 + HUD_BAR_DISTANCE;
        goalBg.y = this._progressBar.y;
        this.addChild(goalBg);

        var cupImage = new cc.Sprite("#cup.png");
        cupImage.x = 0;
        cupImage.y = cupImage.height/2 - 5;
        goalBg.addChild(cupImage);

        this._goalImg = goalBg;
        this.addProgressLabel(goalBg, "0/12");
    },

    addClockImage: function() {
        var clockBg = new cc.Sprite("#whitespace.png");
        clockBg.x = this._goalImg.x + this._goalImg.width/2 + clockBg.width/2 + HUD_BAR_DISTANCE;
        clockBg.y = this._goalImg.y;
        this.addChild(clockBg);

        var clockImg = new cc.Sprite("#clock.png");
        clockImg.x = 0;
        clockImg.y = clockImg.height/2 - 5;
        clockBg.addChild(clockImg);
        this._clockImg = clockBg;
        this.addCountDownClock();
    },

    addProgressLabel: function(object, text) {
        cc.log("text: " + text);
        var label = new cc.LabelTTF(text, "Arial", 32);
        label.color = cc.color("#ffd902");
        label.x = object.width/2 + 10;
        label.y = object.height/2;
        object.addChild(label);

        this._progressLabel = label;
    },

    addStar: function(object, type, posX, posY) {
        var star = new cc.Sprite("#star-" + type +".png");
        star.x = posX;
        star.y = posY;
        object.addChild(star);
    },

    addCountDownClock: function() {
        var self = this;
        var clock = new Clock(TIME_INIT, function(){
            self._layer.completedScene();
        });
        clock.x = this._clockImg.width / 2 + 10;
        clock.y = this._clockImg.height/2;
        this._clockImg.addChild(clock, 99);

        this._clock = clock;
    },

    getRemainingTime: function() {
        return this._clock.getRemainingTime();
    },

    setProgressLabelStr: function(text) {
        this._progressLabel.setString(text + "/12");
    }

});