var Utils = Utils || {}

Utils.shuffle = function(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

Utils.getUserId = function() {
    if (cc.sys.os == cc.sys.OS_IOS)
        return jsb.reflection.callStaticMethod("H102Wrapper", 
                                               "getUserId");
  // else if (cc.sys.os == cc.sys.OS_ANDROID)
  //   return jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "getId", "()Ljava/lang/String;");
}

Utils.moveToMainApp = function() {
    if (cc.sys.os == cc.sys.OS_IOS)
        return jsb.reflection.callStaticMethod("H102Wrapper", 
                                               "openScheme:withData:",
                                               "com.hub102.tsog",
                                               "");
}
