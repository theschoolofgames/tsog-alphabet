var Clock = cc.Node.extend({
	_totalSeconds: 0,
	_countDownClock: null,
	callback: null,

	ctor: function(totalTimes, callback) {
		this._super();

		this._totalSeconds = totalTimes;
		this.callback = callback;
		this.createCountDownClockLabel();
		this.activeCountDownClock();
	},

    activeCountDownClock: function() {
        this.schedule(this.countDownClockAction, CLOCK_INTERVAL, this._totalSeconds);
    },

    createCountDownClockLabel: function() {
        var countDownClockLabel = cc.LabelTTF(this.getCurrentTime(), "Arial", 32);
        countDownClockLabel.color = cc.color.RED;

        this._countDownClock = countDownClockLabel;
        this.addChild(countDownClockLabel);
    },

    countDownClockAction: function() {
        this._totalSeconds -= 1;
        var currentTime = this.getCurrentTime();
        this._countDownClock.setString(currentTime);

        if (this.callback && this._totalSeconds == 1) {
        	this.callback();
        }
    },

    getCurrentTime: function() {
    	var minutes = Math.floor(this._totalSeconds/60);
        var seconds = this._totalSeconds % 60;
        var currentTime = "";
        if (seconds < 10) {
            currentTime = minutes + ":0" + seconds
        }
        else
            currentTime = minutes + ":" + seconds;

        return currentTime;
    }
})