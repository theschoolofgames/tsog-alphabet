var EffectLayer = cc.Layer.extend({
    _animFrames: null,
    _object: null,
    _effectName: null,
    _effectNode: null,
    _effectNodeAction: null,
    _effectDelay: 0,
    _effectFrames: 0,
    _loop: false,

    ctor: function(object, effectName, effectDelay, effectFrames, loop) {
        this._super();

        this._object = object;
        this._effectName = effectName;
        this._effectFrames = effectFrames;
        this._effectDelay = effectDelay;
        this._loop = loop;

        this._addObjectEffect();
    },

    _addAnimationFrames: function() {
        var animFrames = [];
        for (var i = 1; i < this._effectFrames; i++) {
            var str = this._effectName + "-" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        this._animFrames = animFrames;
    },

    _addEffectNode: function() {
        var effectNode = new cc.Sprite("#" + this._effectName + "-1.png");
        effectNode.x = this._object.width/2;
        effectNode.y = 0;
        if (this._loop)
            effectNode.y = this._object.height/2;

        this._object.addChild(effectNode, 10);

        this._effectNode = effectNode;
    },

    _addObjectEffect: function() {
        this._addAnimationFrames();
        this._addEffectNode();
        var effectAnimation = new cc.Animation(this._animFrames, this._effectDelay);

        var self = this;
        if (!this._loop)
            this._effectNode.runAction(
                cc.sequence(
                    cc.animate(effectAnimation),
                    cc.delayTime(0),
                    cc.callFunc(function() {
                        self._object.removeChild(self._effectNode);
                        self._effectNode = null;
                    })
                )
            );
        else {
            var effectNodeAction = cc.repeatForever(
                                        cc.sequence(
                                            cc.animate(effectAnimation)
                                        )
                                    );
            this._effectNode.runAction(effectNodeAction);
            this._effectNodeAction = effectNodeAction;
        }
    },

    stopRepeatAction: function() {
        if (this._effectNode)
            this._effectNode.removeFromParent();
    }
});
