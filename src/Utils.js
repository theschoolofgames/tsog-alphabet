var Utils = Utils || {}

Utils.shuffle = function(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

Utils.getUserId = function() {
    if (cc.sys.os == cc.sys.OS_IOS)
        return jsb.reflection.callStaticMethod("H102Wrapper", 
                                               "getUserId");
    if (cc.sys.os == cc.sys.OS_ANDROID)
        return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getUserId", "()Ljava/lang/String;");
}

Utils.moveToMainApp = function() {
    if (cc.sys.os == cc.sys.OS_IOS)
        jsb.reflection.callStaticMethod("H102Wrapper", 
                                        "openScheme:withData:",
                                        "com.hub102.tsog",
                                        "");
    if (cc.sys.os == cc.sys.OS_ANDROID) {
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity",
                                        "openScheme",
                                        "(Ljava/lang/String;Ljava/lang/String;)Z",
                                        "com.hub102.tsog",
                                        "");
    }
}
